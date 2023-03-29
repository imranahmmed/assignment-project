import React, { useState, useEffect } from 'react';
import Button from './Button';
import Div from './Div';
import Img from './Img';
import { useSelector, useDispatch } from 'react-redux';
import { activeUser } from '../slices/activeUserSlice';
import { AiFillCamera } from 'react-icons/ai'
import Modal from './Modal'
import InputBox from './InputBox';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getDatabase, ref as realtimedbref, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';



const UserCard = ({ onClick }) => {
    const db = getDatabase();
    const auth = getAuth();

    const dispatch = useDispatch()
    const data = useSelector(state => state);
    const loggedInUser = data.activeUserData.userInfo.uid;
    const loggedInUserName = data.activeUserData.userInfo.displayName;
    const loggedInUserEmail = data.activeUserData.userInfo.email;
    const loggedInUserPhotoURL = data.activeUserData.userInfo.photoURL;

    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    let [openModal, setOpenModal] = useState(false);
    let handleModal = () => {
        setOpenModal(!openModal);
    }

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());

            const storage = getStorage();
            const profilePictureRef = ref(storage, 'profile-pictures/' + loggedInUser);
            const profilePicture = cropper.getCroppedCanvas().toDataURL();
            uploadString(profilePictureRef, profilePicture, 'data_url').then((snapshot) => {
                setOpenModal(false);
                setImage("");
                getDownloadURL(profilePictureRef).then((downloadURL) => {
                    update(realtimedbref(db, 'users/' + auth.currentUser.uid), {
                        photoURL: downloadURL,
                    }).then(() => {
                        updateProfile(auth.currentUser, {
                            photoURL: downloadURL
                        })
                    }).then(() => {
                        dispatch(activeUser(auth.currentUser));
                        localStorage.setItem("activeUserInfo", JSON.stringify(auth.currentUser))
                        console.log("update Hoicy")
                    });
                });
            });
        }
    };


    return (
        <Div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Div className="flex flex-col items-center py-10">
                <Div className="group h-[100px] w-[100px] rounded-full shadow-lg overflow-hidden mb-3 relative">
                    <Div className="group-hover:scale-100 duration-300 absolute top-0 left-0 h-full w-full scale-0 bg-[#1f293782] text-white flex items-center justify-center cursor-pointer">
                        <AiFillCamera onClick={handleModal} className='text-2xl' />
                    </Div>
                    {loggedInUserPhotoURL
                        ?
                        <Img className="w-full" src={loggedInUserPhotoURL} alt="Bonnie image" />
                        :
                        <Img className="w-full" src="assets/images/08.png" alt="Bonnie image" />
                    }
                </Div>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">{loggedInUserName.toUpperCase()}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{loggedInUserEmail}</span>
                <Div className="flex mt-4 space-x-3 md:mt-6">
                    <Button onClick={onClick} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Button>

                    <Link to="/displayName/profile" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-blue hover:text-white bg-blue-100 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-100 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Profile</Link>
                </Div>
            </Div>

            {openModal &&
                <Modal onClick={handleModal} buttonClick={getCropData} modalHeading="Update profile picture" buttonText="Save">
                    <Div className='flex gap-3'>
                        <Div className='w-[100px] h-[100px] overflow-hidden bg-slate-100 rounded-full mx-auto'>
                            {image
                                ?
                                <Div className='img-preview w-full h-full'></Div>
                                :
                                loggedInUserPhotoURL
                                    ?
                                    <Img src={loggedInUserPhotoURL} />
                                    :
                                    <Img src='assets/images/08.png' />
                            }
                        </Div>
                    </Div>

                    <InputBox type='file' className='text-white' onChange={onChange} />
                    {image &&
                        <>
                            <Cropper
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                        </>
                    }
                </Modal>
            }
        </Div>

    )
}

export default UserCard
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import IconButton from '../../../../utils/buttons/IconButton'
import Basicinput from '../../../../utils/input/Basicinput'
import { validateEmptyString } from '../../../../utils/CommonFunction';
import { useSearchUsers } from '../../../../hooks/authHook';
import { FILE_URL } from '../../../../constant';
import BigButton from '../../../../utils/buttons/BigButton';
import { useApproveMember } from '../../../../hooks/modHook';

export default function ApprovedUserModal({ isOpen, setModal }) {
    const [userSelected, setUserSelected] = useState(false);
    const [username, setUsername] = useState("");
    const [serachTerm, setSerachTerm] = useState("");
    const [selectedUserId, setSelectedUserId] = useState('');

    const { data, isLoading, isFetching } = useSearchUsers({
        query: serachTerm,
        page: 1,
    });

    const { mutate, isPending, error, isError } = useApproveMember();

    function toggleDisabledUser() {
        setUserSelected((prev) => !prev);
    }

    function clickUser(user) {
        toggleDisabledUser();
        setUsername(user?.username);
        setSelectedUserId(user?._id);
    }

    function handleClick() {
        mutate({ user_id: selectedUserId });
        setModal(false);
    }

    return (
        <div className="modal-overlay div-center-justify-center ">
            <div className="small-modal-content  flex  flex-col relative z-[] ">
                <div className='div-center-justify mb-3'>
                    <h2 className='large-text-large-weight'>Add approved user</h2>
                    <IconButton onClick={() => setModal(false)} size={25} Icon={IoMdClose} />
                </div>
                <div className=''>
                    <Basicinput
                        placeHolder={userSelected ? `u/${username}` : "Search users"}
                        className={'mt-4 secondary-bg'}
                        style={{ padding: 10 }}
                        validationFunc={validateEmptyString}
                        setFormValues={setSerachTerm}
                        value={serachTerm}
                        name={"serach"}
                        isSingleValueSetter
                        disabled={userSelected}
                        disableRemoveFunc={toggleDisabledUser}
                    />
                    {/* Show search results if available */}
                    {data?.length > 0 && !userSelected && (
                        <div className='absolute h-[210px] overflow-y-scroll bg-[var(--background)] w-full z-[1000] left-1/2 transform -translate-x-1/2'>
                            <div className="mt-2">
                                {data.map((item, index) => (
                                    <div key={index}
                                        onClick={() => clickUser(item)}
                                        className="div-center-justify px-[15px] icon-button-hover cursor-pointer "
                                    >
                                        <div className="div-center gap-2 my-4" >
                                            <img
                                                src={`${FILE_URL}/${item?.profile_avtar}`}
                                                alt=""
                                                className="img-small-style"
                                            />
                                            <a
                                                className='medium-text-normal-weight'
                                            >
                                                u/{item?.username}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(isLoading || isFetching) && <div>Loading...</div>}
                        </div>
                    )}
                </div>
                <div className='div-center gap-3 justify-end mt-5'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 px-4 rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton loading={isPending} onClick={handleClick} className={'teritory-bg px-6 rounded-[20px!important] text-[#fff]'} title={'Add'} />
                </div>
            </div>
        </div>
    )
}

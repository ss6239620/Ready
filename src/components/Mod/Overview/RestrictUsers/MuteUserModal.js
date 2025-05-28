import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import IconButton from '../../../../utils/buttons/IconButton'
import { validateEmptyString } from '../../../../utils/CommonFunction'
import Basicinput from '../../../../utils/input/Basicinput';
import SimpleDropdown from '../../../../utils/dropdown/SimpleDropdown';
import { PiCheckLight } from 'react-icons/pi';
import Biginput from '../../../../utils/input/Biginput';
import BigButton from '../../../../utils/buttons/BigButton';
import { useMuteUser } from '../../../../hooks/modHook';
import { useSeachByUsername } from '../../../../hooks/authHook';
import { FILE_URL } from '../../../../constant';

export default function MuteUserModal({ isOpen, setModal }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchTerm, setisSearchTerm] = useState(false)
    const [formValues, setFormValues] = useState({
        mute_user_id: '',
        mute_duration: 3,
        mod_note: '',
    })

    const { mutate, isPending, } = useMuteUser();

    const { data, isPending: isSearchPending, refetch } = useSeachByUsername({
        query: searchTerm
    });

    const isEmpty = !data || Object.keys(data).length === 0;

    function durasionSelected(onClose, item) {
    setFormValues((prev) => ({
        ...prev, mute_duration: item
    }));
    if (onClose) onClose();
}

    function handleClick() {
        mutate(formValues);
        setModal(false);
    }

    function handleUserSubmit(e) {
        e.preventDefault();
        if (searchTerm.trim !== '') {
            setisSearchTerm(true);
            refetch();
        }
    }

    function removeUser() {
        setSearchTerm('');
        setisSearchTerm(false);
    }

    useEffect(() => {
        if (data?._id) {
            setFormValues(prev => {
                if (prev.mute_user_id !== data._id) {
                    return { ...prev, mute_user_id: data._id };
                }
                return prev;
            });
        }
    }, [isSearchPending, data]);


    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="small-modal-content  flex  flex-col ">
                <div className='div-center-justify mb-3'>
                    <h6 className='extra-large-text-large-weight'>Mute User</h6>
                    <IconButton Icon={IoMdClose} onClick={() => setModal(false)} />
                </div>
                {!isSearchTerm || isEmpty ?
                    <form onSubmit={handleUserSubmit}>
                        <Basicinput
                            placeHolder={"Search users"}
                            className={'mt-4 secondary-bg'}
                            style={{ padding: 10 }}
                            setFormValues={setSearchTerm}
                            value={searchTerm}
                            name={"serach"}
                            isSingleValueSetter
                            errorText={"Press enter to find user"}
                        />
                    </form> :
                    <div className='bg-[var(--secondary)] rounded-2xl p-4'>
                        <div className='div-center-justify'>
                            <div className='div-center gap-2'>
                                <img
                                    src={`${FILE_URL}/${data?.profile_avtar}`}
                                    alt=""
                                    className='img-small-style'
                                />
                                u/{data?.username}
                            </div>
                            <IconButton size={20} Icon={IoMdClose} onClick={removeUser} />
                        </div>
                    </div>
                }
                <div className='mt-4'>
                    <p className='small-text-normal-weight text-[var(--text-secondary)]'>Duration <span className='small-text-small-weight text-[var(--teritory)]'>*</span></p>

                    <SimpleDropdown title={`${formValues.mute_duration} Days`} className={'mt-4 !justify-between'} childClassName={'z-[5000]'} >
                        {(closeDropdown) => (
                            <div className='w-[100%]'>
                                {[3, 7, 28].map((item, key) => (
                                    <div className={`icon-button-hover div-center-justify cursor-pointer ${formValues.mute_duration === item ? "bg-[var(--secondary)]" : ""} p-2`} key={key} onClick={() => durasionSelected( closeDropdown, item)}>
                                        <p className={`small-text-normal-weight`}>{item}<span > Days</span></p>
                                        {formValues.mute_duration === item && <PiCheckLight size={15} />}
                                    </div>
                                ))}
                            </div>
                        )}
                    </SimpleDropdown>
                    <Biginput
                        placeHolder={"Mod Note"}
                        minHeight={30}
                        className={'my-4'}
                        setFormValues={setFormValues}
                        value={formValues.mod_note}
                        name={"mod_note"}
                    />
                </div>
                <div className='div-center gap-3 justify-end w-[95%]'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton disabled={isPending} onClick={handleClick} className={'teritory-bg px-4 rounded-[20px!important] text-[#fff]'} title={'Mute'} />
                </div>
            </div>
        </div>
    )
}

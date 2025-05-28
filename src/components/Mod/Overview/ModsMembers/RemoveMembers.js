import { IoMdClose } from "react-icons/io";
import IconButton from "../../../../utils/buttons/IconButton";
import BigButton from "../../../../utils/buttons/BigButton";
import { useRemoveInvite } from "../../../../hooks/modHook";

export default function RemoveBan({
    isOpen,
    setModal,
    userBanId,
    method="invite" }) {

    const { mutate, isPending } = useRemoveInvite();

    function handleRemove() {
        mutate({ member_id: userBanId, method: method });
        setModal(false)
    }
    return (
        <div className="modal-overlay div-center-justify-center">
            <div className="small-modal-content  flex  flex-col ">
                <div className='div-center-justify mb-3'>
                    <p className='large-text-normal-weight'>Are You Sure?</p>
                    <IconButton Icon={IoMdClose} onClick={() => setModal(false)} />
                </div>
                <p className='small-text-normal-weight '>They'll be able to participate in your tribe again.</p>
                <div className='div-center-justify gap-3 mt-7'>
                    <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 w-full rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
                    <BigButton loading={isPending} onClick={handleRemove} className={'teritory-bg px-4 rounded-[20px!important] w-full text-[#fff]'} title={'Yes, Remove'} />
                </div>
            </div>
        </div>
    )
}
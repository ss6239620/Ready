import React, { useEffect, useState } from 'react'
import { TiVolumeMute } from 'react-icons/ti'
import MuteUserModal from './MuteUserModal'
import SearchInput from '../../../../utils/input/SearchInput';
import BigButton from '../../../../utils/buttons/BigButton';
import { IoMdArrowBack, IoMdArrowForward, IoMdClose } from 'react-icons/io';
import Underline from '../../../../utils/Underline';
import IconButton from '../../../../utils/buttons/IconButton';
import { useGetMutedUsers, useRemoveUserBan, useSearchBannedUser } from '../../../../hooks/modHook';
import { FILE_URL } from '../../../../constant';
import { GoPencil } from 'react-icons/go';
import { PiHammer } from 'react-icons/pi';
import { getTimeLeft, truncateText } from '../../../../utils/CommonFunction';
import CircularLoader from '../../../../utils/CircularLoader';

export default function MuteUser() {
  const [muteUserModal, setMuteUserModal] = useState(false);
  const [muteHovered, setMuteHovered] = useState(null);
  const [mutedUserSearch, setmutedUserSearch] = useState('');
  const [muteUserId, setMuteUserId] = useState('');
  const [removeUserMute, setremoveUserMute] = useState(false);
  const [isUserSearched, setIsUserSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  function handleMouseLeave() {
    setMuteHovered(null);
  }

  function handleMouseEnter(id) {
    setMuteHovered(id);
  }

  function handleMuteRemove(id) {
    setMuteUserId(id)
    setremoveUserMute(true);
  }

  const { data, isMuteLoading: isMutedLoading, refetch: muteUserRefetch } = useGetMutedUsers(page, limit);

  const { data: searchedMutedUserData, isLoading: isSearchMutedLoading, refetch: serachUserRefetch } = useSearchBannedUser({
    query: mutedUserSearch,
    restrict_type: "Muted"
  });

  const totalCount = data?.totalCount || 0;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalCount);
  const totalPages = Math.ceil(totalCount / limit);

  const mutedUserData = data?.data || [];

  const MutedUserList = isUserSearched
    ? searchedMutedUserData
      ? [searchedMutedUserData]
      : []
    : mutedUserData;

  function handleSearchBannedUser(e) {
    e.preventDefault();
    if (mutedUserSearch.trim() !== '') {
      setIsUserSearched(true);
      serachUserRefetch();
    } else {
      setIsUserSearched(false);
    }
  }

  useEffect(() => {
    if (mutedUserSearch.trim() === '') {
      setIsUserSearched(false);
    }
  }, [mutedUserSearch])

  return (
    <>
      {muteUserModal && <MuteUserModal isOpen={muteUserModal} setModal={setMuteUserModal} />}
      {removeUserMute && <RemoveMute isOpen={removeUserMute} setModal={setremoveUserMute} userBanId={muteUserId} />}
      <div className='w-[70%] flex flex-col'>
        <div className="flex self-end">
          <BigButton Icon={TiVolumeMute} onClick={() => { setMuteUserModal(true) }} className={'accent-bg my-2 border-radius-large text-[#fff]'} title={'Mute User'} />
        </div>
        <div className='div-center-justify mt-3'>
          <SearchInput
            placeHolder={"Search Banned User"}
            setFormValues={setmutedUserSearch}
            value={mutedUserSearch}
            onChange={handleSearchBannedUser}
          />
          <div className='div-center gap-2'>
            <div>
              <BigButton className={'rounded-[10px!important] px-5 icon-button-hover '} title={`${from} - ${to}`} />
            </div>
            <div className='div-center gap-2'>
              <IconButton disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))} Icon={IoMdArrowBack} size={20} />
              <IconButton disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)} Icon={IoMdArrowForward} size={20} />
            </div>
          </div>
        </div>
        <Underline className={"mt-4"} />
        {!isMutedLoading ?
          <table className='w-[100%] border-collapse'>
            <thead>
              <tr className='divider-bottom '>
                <th className='medium-text-large-weight text-left  p-[20px_8px]'>USERNAME</th>
                <th className='medium-text-large-weight text-left  p-[20px_8px]'>DURATION</th>
                <th className='medium-text-large-weight text-left  p-[20px_8px]'>NOTE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MutedUserList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 small-text-normal-weight text-gray-500">
                    {isUserSearched ? 'No user found matching your search.' : 'No muted users available.'}
                  </td>
                </tr>
              ) : (
                MutedUserList.map((item, key) => (
                  <tr
                    className='divider-bottom'
                    key={key}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => handleMouseEnter(key)}
                  >
                    <td className='div-center gap-2 medium-text-normal-weight text-left p-[20px_8px]'>
                      <img
                        src={`${FILE_URL}/${item?.user?.profile_avtar}`}
                        alt=""
                        className='img-small-style'
                      />
                      {item?.user?.username}
                    </td>
                    <td className='small-text-normal-weight text-left  p-[20px_8px]'>
                      {item?.ban_duration === null
                        ? "Permanent"
                        : item?.mute_duration
                          ? getTimeLeft(item?.mute_duration)
                          : "N/A"}
                    </td>
                    <td className='small-text-normal-weight text-left  p-[20px_8px]'>
                      {truncateText(item?.mod_note, 150)}
                    </td>
                    <td className={`div-center gap-3 p-[20px_8px] transition-opacity duration-200 ${muteHovered === key ? 'opacity-100' : 'opacity-0'}`}>
                      <IconButton onClick={() => handleMuteRemove(item?._id)} className={'teritory-bg'} Icon={PiHammer} size={20} />
                      <IconButton Icon={GoPencil} size={20} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          : (isMutedLoading || isSearchMutedLoading) ? <CircularLoader /> : null}
      </div>
    </>
  )
}


function RemoveMute({
  isOpen,
  setModal,
  userBanId }) {

  const { mutate, isPending } = useRemoveUserBan();

  function handleRemove() {
    mutate({ ban_id: userBanId });
    setModal(false)
  }
  return (
    <div className="modal-overlay div-center-justify-center">
      <div className="small-modal-content  flex  flex-col ">
        <div className='div-center-justify mb-3'>
          <p className='large-text-normal-weight'>Are You Sure?</p>
          <IconButton Icon={IoMdClose} onClick={() => setModal(false)} />
        </div>
        <p className='small-text-normal-weight '>They'll be able to participate in your community again.</p>
        <div className='div-center-justify gap-3 mt-7'>
          <BigButton onClick={() => setModal(false)} className={'secondary-bg my-4 w-full rounded-[20px!important] text-[#fff]'} title={'Cancel'} />
          <BigButton loading={isPending} onClick={handleRemove} className={'teritory-bg px-4 rounded-[20px!important] w-full text-[#fff]'} title={'Yes, Unmute'} />
        </div>
      </div>
    </div>
  )
}
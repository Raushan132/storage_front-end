import moment from 'moment';
import React, { useState } from 'react'
import { BsFilter } from 'react-icons/bs';

const SearchMenu = ({ handleQuery, query,handleSearchBtn }) => {





  


  return (
    <div className="dropdown dropdown-open">
      <label tabIndex={0} className="btn m-1 text-xl"><BsFilter /></label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu px-2 py-8 shadow bg-base-300 rounded-box w-96 -translate-x-1/2">
        <div className="flex flex-col gap-5 px-5">
          <div className="flex gap-5 justify-between items-center">
            <span>Type:</span>
            <span>
              <select className="select select-bordered w-full select-sm max-w-sm" name="type" onChange={handleQuery}>
                <option value="" >Any</option>
                <option vlaue="images">Photos & Images</option>
                <option value="pdf">PDF</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="folder">Folder</option>
              </select>
            </span>
          </div>

          <div className="flex gap-5 justify-between items-center">
            <span>Keyword:</span>
            <span>
              <input type="text" placeholder="Has the word" name="word" defaultValue={query.word} onChange={handleQuery} className="input input-bordered w-full max-w-xs input-sm" />
            </span>
          </div>

          <div className="flex gap-5 justify-between items-center">
            <span>Location:</span>
            <span className="flex gap-4">
              <span className="flex gap-2 items-center">
                <input type="checkbox" id="checkboxTrash" defaultValue="trashed" name="isTrash" onChange={handleQuery} className="checkbox checkbox-error checkbox-xs" />
                <label htmlFor="checkboxTrash">Trash</label>
              </span>
              <span className="flex gap-2 items-center">
                <input type="checkbox" id="checkboxShare" defaultValue="shared" name="isShare" onChange={handleQuery} className="checkbox checkbox-error checkbox-xs" />
                <label htmlFor="checkboxShare">Share with me</label>
              </span>
            </span>
          </div>

          <div className="flex gap-5 justify-between items-center">
            <span>Date:</span>
            <span>
              <select className="select select-bordered w-full select-sm max-w-sm" name="dateOption" onChange={handleQuery}>
                <option value="" >Any Time</option>
                <option value="0">Today</option>
                <option value="1">Yesterday</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="Custom">Custom</option>
              </select>
            </span>
          </div>

         { query.dateOption==='Custom' && <div className='flex flex-col gap-5'>

            <div className="flex gap-5 justify-between items-center">
              <span>Start Date:</span>
              <span><input type="date" name="after" onChange={handleQuery} className='input input-sm' /></span>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <span>End Date:</span>
              <span><input type="date" name="before" onChange={handleQuery} className='input input-sm' /></span>
            </div>
          </div>}

          <div className="flex justify-end">
            <button className="btn btn-sm btn-primary" onClick={handleSearchBtn}>Search</button>
          </div>

        </div> {/*main div for filter*/}

      </ul>
    </div>
  )
}

export default SearchMenu
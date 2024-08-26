import React, { useState, useEffect } from 'react';
import { Textarea } from "../textArea";
import { Select, SelectItem } from "sabai-ui-dev";
import { Avatar } from "../avatar";
import { Button } from "../button";

interface AttendanceFormProps {
  photo?: string;
  fullName?: string;
  attendanceData: Attendance[];
  selectedValue: string;
  noteValue: string;
  onDeleteNote?: () => void;
  onChange: (data: { attendance: string; note: string }) => void;
}

interface Attendance {
  value: string;
  label: string;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  photo,
  fullName,
  attendanceData = [],
  selectedValue,
  noteValue,
  onDeleteNote,
  onChange,
}) => {

  // Local state for managing attendance, note, and UI states
  const [attendance, setAttendance] = useState<string>(selectedValue);
  const [note, setNote] = useState<string>(noteValue);
  const [isNoteVisible, setIsNoteVisible] = useState<boolean>(!!noteValue);
  const [isUpdateNote, setIsUpdateNote] = useState<boolean>(false);
  const [isCreateNote, setIsCreateNote] = useState<boolean>(false);

  // sync local state with props when they change
  useEffect(() => {
    setAttendance(selectedValue);
    setNote(noteValue);
  }, [selectedValue, noteValue]);

  // Toggle the visibility of the note section
  const handleVisibleNote = () => {
    setIsNoteVisible(prev => !prev)
    if (!!noteValue === false) {
      setIsCreateNote(true);
    }
  }

  // Handle attendance selection changes
  const handleAttendanceChange = (item: string) => {
    setAttendance(item);
    onChange({ attendance: item, note });
  };

  // Handle note text changes
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNote(value);
  };

  // Handle cancel update event 
  const handleCancelUpdate = () => {
    setNote(noteValue);
    setIsUpdateNote(false);
  }

  // Handle delete note event
  const handleDeleteNote = () => {
    setIsCreateNote(true);
    onDeleteNote();
  }

  // Handle update note event
  const handleUpdateNote = () => {
    onChange({ attendance, note: note });
    setIsUpdateNote(false);
  }

  // Handle create new note event
  const handleCreateNote = () => {
    onChange({ attendance, note: note });
    setIsCreateNote(prev => !prev)
  }

  return (
    <fieldset className='px-4 py-2 rounded-2xl border border-gray-300 mb-3 transition-all duration-300 ease-out'>
      <legend className='flex items-center gap-2'>
        {/* Display the photo or a placeholder avatar */}
        {photo ? (
          <img
            src={photo}
            alt='Avatar'
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <Avatar size="md" />
        )}
        <p className='capitalize'>{fullName || ''}</p>
      </legend>

      <div className='flex space-x-3 mb-2'>
        {/* Attendance form section */}
        <Select
          value={attendance}
          onChange={handleAttendanceChange}
        >
          {attendanceData.map((attendance) => (
            <SelectItem key={attendance.value} value={attendance.value}>
              {attendance.label}
            </SelectItem>
          ))}
        </Select>

        {/* Button to toggle note visibility */}
        <Button variant="outline" colorScheme="secondary" className="p-0 w-[46px] h-[46px] rounded-lg border-gray-300 bg-white hover:bg-white focus:border-blue-500 focus:text-blue-500" onClick={handleVisibleNote} >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15V5a2 2 0 0 0-2-2h-7m9 12v.172a2 2 0 0 1-.586 1.414l-3.828 3.828a2 2 0 0 1-1.414.586H15m6-6h-4a2 2 0 0 0-2 2v4m0 0H5a2 2 0 0 1-2-2v-7m10-5h4m-7 4h7M7 15h4M6 3v3m0 3V6m0 0h3M6 6H3" />
          </svg>
        </Button>
      </div>

      {/* Section for editing, or deleting the note */}
      {isNoteVisible && !isCreateNote && <div className='grid grid-cols-1 gap-3 mb-2'>
        <Textarea
          label='Note'
          value={note}
          onChange={handleNoteChange}
          disabled={!isUpdateNote}
          validate={(value: string) => {
            if (value.length < 1) {
              return 'Note is required';
            }
          }}
        />

        {
          isUpdateNote ?
            <div className="flex justify-end items-center gap-3">
              <Button variant="ghost" colorScheme="secondary" onClick={handleCancelUpdate}>Cancel</Button>
              <Button onClick={handleUpdateNote}>Update</Button>
            </div>
            :
            <div className="flex justify-end items-center gap-3">
              <Button variant="ghost" colorScheme="error" onClick={handleDeleteNote}>Delete</Button>
              <Button onClick={() => setIsUpdateNote(true)}>Edit</Button>
            </div>
        }
      </div>}

      {/* Section for create new note */}
      {isNoteVisible && isCreateNote && <div className='grid grid-cols-1 gap-3 mb-2'>
        <Textarea
          label='Note'
          value={note}
          onChange={handleNoteChange}
          validate={(value: string) => {
            if (value.length < 0) {
              return 'Note is required';
            }
          }}
        />
        <div className="flex justify-end items-center gap-3">
          <Button variant="ghost" colorScheme="secondary" onClick={() => setIsNoteVisible(false)}>Cancel</Button>
          <Button onClick={handleCreateNote}>Save</Button>
        </div>
      </div>}
    </fieldset>
  );
};

export default AttendanceForm;

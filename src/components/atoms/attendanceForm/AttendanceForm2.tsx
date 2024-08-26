import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea } from "../textArea";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { Select, SelectItem } from "../select";

interface AttendanceForm2Props {
  photo?: string;
  fullName?: string;
  attendanceData: Attendance[];
  selectedValue: string;
  noteValue: string;
  onChange: (data: { attendance: string; note: string }) => void;
}

interface Attendance {
  value: string;
  label: string;
}

const AttendanceForm2: React.FC<AttendanceForm2Props> = ({
  photo,
  fullName,
  attendanceData = [],
  selectedValue,
  noteValue,
  onChange,
}) => {
  const noteRef = useRef<HTMLDivElement>(null);
  const buttonNoteRef = useRef<HTMLDivElement>(null);
  const [attendance, setAttendance] = useState<string>(selectedValue);
  const [note, setNote] = useState<string>(noteValue);
  const [isNoteVisible, setIsNoteVisible] = useState<boolean>(!!noteValue);
  const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAttendance(selectedValue);
    setNote(noteValue);
  }, [selectedValue, noteValue]);

  useEffect(() => {
    if (noteRef.current) {
      if (isNoteVisible) {
        setMaxHeight(`${noteRef.current.scrollHeight}px`);
      } else {
        setMaxHeight('0px');
      }
    }
  }, [isNoteVisible]);

  const handleClickOutside = useCallback((event: any) => {
    if (noteRef.current && !noteRef.current.contains(event.target as Node)
      && buttonNoteRef.current && !buttonNoteRef.current.contains(event.target as Node)) {
      if (!note) {  // Close only if the note is empty
        setIsNoteVisible(false);
      }
    }
  }, [note]);

  useEffect(() => {
    if (isNoteVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNoteVisible, handleClickOutside]);

  const handleVisibleNote = () => {
    setIsNoteVisible((prev) => !prev);
  };

  const handleAttendanceChange = (item: string) => {
    setAttendance(item);
    onChange({ attendance: item, note });
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNote(value);
    onChange({ attendance, note: value });
  };

  return (
    <fieldset className="px-4 py-2 rounded-2xl border border-gray-300 mb-3 transition-all duration-300 ease-out h-fit">
      <legend className="flex items-center gap-2">
        {photo ? (
          <img
            src={photo}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <Avatar size="md" />
        )}
        <p className="capitalize">{fullName || ''}</p>
      </legend>

      <div className="flex space-x-3 mb-2">
        <Select value={attendance} onChange={handleAttendanceChange}>
          {attendanceData.map((attendance) => (
            <SelectItem key={attendance.value} value={attendance.value}>
              {attendance.label}
            </SelectItem>
          ))}
        </Select>

        <div ref={buttonNoteRef}>
          <Button
            variant="outline"
            colorScheme="secondary"
            className="p-0 w-[46px] h-[46px] rounded-lg border-gray-300 bg-white hover:bg-white focus:border-blue-500 focus:text-blue-500"
            onClick={handleVisibleNote}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 15V5a2 2 0 0 0-2-2h-7m9 12v.172a2 2 0 0 1-.586 1.414l-3.828 3.828a2 2 0 0 1-1.414.586H15m6-6h-4a2 2 0 0 0-2 2v4m0 0H5a2 2 0 0 1-2-2v-7m10-5h4m-7 4h7M7 15h4M6 3v3m0 3V6m0 0h3M6 6H3"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div
        ref={noteRef}
        className={`grid grid-cols-1 gap-3 mb-2 overflow-hidden transition-all duration-300 ease-out`}
        style={{ maxHeight, opacity: isNoteVisible ? 1 : 0, visibility: isNoteVisible ? 'visible' : 'hidden' }}
      >
        <Textarea
          label="Note"
          value={note}
          onChange={handleNoteChange}
        />
      </div>
    </fieldset>
  );
};

export default AttendanceForm2;

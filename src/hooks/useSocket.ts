import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { BACKEND_URL } from '@app/constants';
import { ExamSlotsReportDto } from '@app/interface/interview.interface';

interface SocketHook {
  socket: Socket | null;
  availableSlots: ExamSlotsReportDto | null;
  joinDay: (date: string) => void;
  getAvailableSlots: (examId: string) => void;
}

export const useSocket = (examId: string): SocketHook => {
  const socketRef = useRef<Socket | null>(null);
  const [availableSlots, setAvailableSlots] = useState<ExamSlotsReportDto | null>(null);

  useEffect(() => {
    socketRef.current = io(BACKEND_URL, {
      transports: ['websocket'],
      // cors: {
      //   origin: '*',
      // },
    });

    socketRef.current.on(
      'available_slots',
      (data: { message: string; data: ExamSlotsReportDto }) => {
        setAvailableSlots(data.data);
      },
    );

    if (examId) {
      socketRef.current.emit('get_available_slots', { examId });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [examId]);

  const joinDay = (date: string) => {
    if (socketRef.current) {
      socketRef.current.emit('join_day', { date });
    }
  };

  const getAvailableSlots = (examId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('get_available_slots', { examId });
    }
  };

  return {
    socket: socketRef.current,
    availableSlots,
    joinDay,
    getAvailableSlots,
  };
};

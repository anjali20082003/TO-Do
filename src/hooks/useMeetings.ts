import { useEffect, useState } from 'react';
import { Meeting } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Storage keys
const USERS_STORAGE_KEY = 'snm_users';

// Helper functions for user data management
const getUserData = (userId: string) => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) return null;
  const usersData = JSON.parse(users);
  return usersData[userId] || null;
};

const saveUserData = (userId: string, userData: any) => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  const usersData = users ? JSON.parse(users) : {};
  usersData[userId] = userData;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
};

export const useMeetings = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const userData = getUserData(user.id);
      if (userData && userData.meetings) {
        setMeetings(userData.meetings);
      }
    } else {
      setMeetings([]);
    }
  }, [user]);

  const saveMeetings = (newMeetings: Meeting[]) => {
    if (!user) return;
    
    const userData = getUserData(user.id);
    if (userData) {
      userData.meetings = newMeetings;
      userData.updatedAt = new Date().toISOString();
      saveUserData(user.id, userData);
    }
    setMeetings(newMeetings);
  };

  const addMeeting = (meetingData: Omit<Meeting, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    const newMeeting: Meeting = {
      ...meetingData,
      id: 'meeting_' + Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    };

    const newMeetings = [...meetings, newMeeting];
    saveMeetings(newMeetings);
  };

  const updateMeeting = (id: string, updates: Partial<Meeting>) => {
    const newMeetings = meetings.map(meeting => 
      meeting.id === id 
        ? { ...meeting, ...updates, updatedAt: new Date().toISOString() }
        : meeting
    );
    saveMeetings(newMeetings);
  };

  const deleteMeeting = (id: string) => {
    const newMeetings = meetings.filter(meeting => meeting.id !== id);
    saveMeetings(newMeetings);
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.participants.some(participant => 
                           participant.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesSearch;
  });

  // Get upcoming meetings (next 7 days)
  const upcomingMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.startTime);
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return meetingDate >= now && meetingDate <= oneWeekFromNow;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const stats = {
    total: meetings.length,
    upcoming: upcomingMeetings.length,
    today: meetings.filter(meeting => {
      const meetingDate = new Date(meeting.startTime);
      const today = new Date();
      return meetingDate.toDateString() === today.toDateString();
    }).length,
  };

  return {
    meetings: filteredMeetings,
    upcomingMeetings,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    searchQuery,
    setSearchQuery,
    stats,
  };
};
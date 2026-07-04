//prevent the entry of participant w/o host



overall flow(no socket,all rest api)

Dashboard
      │
      ▼
Click Join Meeting
      │
      ▼
JoinMeeting Page
      │
      ▼
useJoinMeeting()
      │
      ▼
meetingApi.joinMeeting()
      │
      ▼
Backend Controller
      │
      ▼
Validation
      │
      ▼
Success / Error
      │
      ▼
Navigate to MeetingRoom



the architecture:
JoinMeeting.jsx

↓

useJoinMeeting()

↓

meetingApi.joinMeeting()

↓

Backend

↓

Navigate
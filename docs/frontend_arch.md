usemeeting->brain(state,refs,engine)
meetingLayoyt->presentational layer
meeting engine->js obj,perfroms operations on the refs and setters obtained
bottom controls->render the buttons


whenever the user clicks on any bottom control button this is the flow
for the files:
bottom controls->usemeeting->meetingengine->media.js


 
 
 
                 UI Layer
┌────────────────────────────────────────────┐
│                                            │
│          MeetingLayout.jsx                 │
│                                            │
│  VideoGrid                                │
│  ChatPanel                                │
│  ParticipantsPanel                        │
│  BottomControls                           │
│                                            │
└────────────────────────────────────────────┘
                    ▲
                    │ props
                    │
                    ▼
┌────────────────────────────────────────────┐
│             useMeeting()                   │
│                                            │
│ React state                               │
│ React refs                                │
│ Creates MeetingEngine                     │
│ Exposes handlers to UI                    │
└────────────────────────────────────────────┘
                    ▲
                    │
                    ▼
┌────────────────────────────────────────────┐
│           MeetingEngine                    │
│                                            │
│ initialize()                              │
│ registerEvents()                          │
│ sendMessage()                             │
│ toggleMic()                               │
│ toggleVideo()                             │
│ shareScreen()                             │
│ leaveMeeting()                            │
└────────────────────────────────────────────┘
                    ▲
                    │
                    ▼
┌────────────────────────────────────────────┐
│          Helper Modules                    │
│                                            │
│ media.js                                  │
│ socketEvents.js                           │
│ peerConnection.js                         │
└────────────────────────────────────────────┘
                    ▲
                    │
                    ▼
             Socket.IO + WebRTC
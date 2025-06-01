export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isBot: boolean;
}

export interface ChatRoom {
  id: string;
  country: string;
  title: string;
  sub1: string;
  sub2: string;
  participants: string;
  messages: Message[];
}

export const chatRooms: ChatRoom[] = [
  {
    id: "uk-general",
    country: "UK",
    title: "Personal Assist Team",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    participants: "",
    messages: [
      {
        id: "1",
        sender: "Emma Watson",
        content: "Has anyone applied to Oxford for the Fall 2024 intake? I'm looking for application tips!",
        timestamp: "2:30 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "James Smith",
        content: "I got accepted last year. The personal statement is crucial - make sure to highlight your extracurriculars!",
        timestamp: "2:32 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Sarah Parker",
        content: "The interview process can be intense. I'd recommend checking out their sample questions online.",
        timestamp: "2:33 PM",
        isBot: true
      },
      {
        id: "4",
        sender: "Oliver Brown",
        content: "Anyone here studying at LSE? How's the Economics program?",
        timestamp: "2:35 PM",
        isBot: false
      },
      {
        id: "5",
        sender: "Sophie Wilson",
        content: "I'm in my second year at LSE. The program is challenging but worth it. The networking opportunities are amazing!",
        timestamp: "2:36 PM",
        isBot: true
      }
    ]
  },
  {
    id: "us-general",
    country: "US",
    title: "Personal Assist Team",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    participants: "",
    messages: [
      {
        id: "1",
        sender: "Michael Brown",
        content: "Just got my acceptance to MIT! Anyone else heading there this fall?",
        timestamp: "3:15 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Emily Johnson",
        content: "Congratulations! I'm a sophomore there. The CS program is intense but amazing!",
        timestamp: "3:17 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "David Wilson",
        content: "How's the housing situation at MIT? Still deciding between dorms and off-campus.",
        timestamp: "3:20 PM",
        isBot: true
      },
      {
        id: "4",
        sender: "Jessica Lee",
        content: "First-year dorms are great for building community. I highly recommend starting there!",
        timestamp: "3:22 PM",
        isBot: false
      }
    ]
  },
  {
    id: "ca-general",
    country: "CA",
    title: "Personal Assist Team",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    participants: "",
    messages: [
      {
        id: "1",
        sender: "Thomas Anderson",
        content: "Anyone here at UBC? Looking for study partners for the Computer Science program.",
        timestamp: "1:05 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Emily Clark",
        content: "I'm in CS at UBC! The AI course is pretty challenging. We could form a study group.",
        timestamp: "1:08 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Lucas Zhang",
        content: "Toronto's tech scene is booming! Great internship opportunities here.",
        timestamp: "1:10 PM",
        isBot: true
      }
    ]
  },
  {
    id: "au-general",
    country: "AU",
    title: "Personal Assist Team",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    participants: "",
    messages: [
      {
        id: "1",
        sender: "Jack Thompson",
        content: "How's the student life at University of Melbourne?",
        timestamp: "4:15 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Emma White",
        content: "It's fantastic! Great mix of academics and social life. The campus is beautiful too.",
        timestamp: "4:17 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Liam O'Connor",
        content: "The coffee culture here is amazing. There's a great café right on campus!",
        timestamp: "4:20 PM",
        isBot: true
      }
    ]
  },
  {
    id: "de-general",
    country: "DE",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Max Weber",
        content: "Anyone studying at TU Munich? How's the Engineering program?",
        timestamp: "5:30 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Anna Schmidt",
        content: "I'm in my second year of Mechanical Engineering there. The facilities are world-class!",
        timestamp: "5:32 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Felix Müller",
        content: "The German language courses for international students are really helpful too.",
        timestamp: "5:35 PM",
        isBot: true
      }
    ]
  },
  {
    id: "fr-general",
    country: "FR",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Sophie Dubois",
        content: "Looking for recommendations for business schools in Paris!",
        timestamp: "6:00 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Pierre Martin",
        content: "HEC Paris has an excellent reputation. The alumni network is incredible.",
        timestamp: "6:03 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Marie Lambert",
        content: "ESSEC is also great, especially for international students.",
        timestamp: "6:05 PM",
        isBot: true
      }
    ]
  },
  {
    id: "jp-general",
    country: "JP",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Takeshi Yamamoto",
        content: "Anyone attending University of Tokyo this year? Looking for study partners!",
        timestamp: "7:15 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Sakura Tanaka",
        content: "Yes! I'm in the Computer Science department. The research opportunities here are amazing.",
        timestamp: "7:17 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Ken Suzuki",
        content: "The robotics lab is particularly impressive. They're doing cutting-edge work.",
        timestamp: "7:20 PM",
        isBot: true
      }
    ]
  },
  {
    id: "in-general",
    country: "IN",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Rahul Sharma",
        content: "How's the startup ecosystem around IIT Bombay?",
        timestamp: "8:00 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Priya Patel",
        content: "It's thriving! Many successful startups began here. The incubator provides great support.",
        timestamp: "8:02 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Amit Kumar",
        content: "The annual tech fest is a great networking opportunity too!",
        timestamp: "8:05 PM",
        isBot: true
      }
    ]
  },
  {
    id: "sg-general",
    country: "SG",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Wei Ling",
        content: "NUS or NTU for Computer Science? Need advice!",
        timestamp: "9:00 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Jason Tan",
        content: "Both are excellent. NUS has stronger industry connections in my experience.",
        timestamp: "9:03 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Sarah Chen",
        content: "NTU's new AI program is really cutting-edge though!",
        timestamp: "9:05 PM",
        isBot: true
      }
    ]
  },
  {
    id: "nz-general",
    country: "NZ",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "James Wilson",
        content: "How's the work-study balance at University of Auckland?",
        timestamp: "10:00 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Emma Thompson",
        content: "Pretty good! The university is very supportive of part-time work.",
        timestamp: "10:02 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "William Clark",
        content: "The outdoor activities here are amazing too. Great way to de-stress!",
        timestamp: "10:05 PM",
        isBot: true
      }
    ]
  },
  {
    id: "nl-general",
    country: "NL",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Lisa van der Berg",
        content: "Anyone studying at TU Delft? How's the Aerospace program?",
        timestamp: "11:00 PM",
        isBot: false
      },
      {
        id: "2",
        sender: "Jan de Vries",
        content: "It's fantastic! The practical projects are really hands-on.",
        timestamp: "11:02 PM",
        isBot: true
      },
      {
        id: "3",
        sender: "Anna Bakker",
        content: "The bike culture here is amazing. Everything is so accessible!",
        timestamp: "11:05 PM",
        isBot: true
      }
    ]
  },
  {
    id: "se-general",
    country: "SE",
    title: "Personal Assist Team",
    participants: "",
    sub1: "General Discussion Room",
    sub2: "Part time Jobs Assistance",
    messages: [
      {
        id: "1",
        sender: "Erik Andersson",
        content: "How's the Master's program at KTH? Considering applying.",
        timestamp: "12:00 AM",
        isBot: false
      },
      {
        id: "2",
        sender: "Sofia Nilsson",
        content: "The research facilities are world-class. Great work-life balance too!",
        timestamp: "12:02 AM",
        isBot: true
      },
      {
        id: "3",
        sender: "Lars Gustafsson",
        content: "The sustainability focus in all programs is really impressive.",
        timestamp: "12:05 AM",
        isBot: true
      }
    ]
  }
];
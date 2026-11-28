export interface VideoTestimonial {
  id: number;
  name: string;
  place: string;
  videoSrc: string;
  avatar: string;
  previewTime?: number;
  duration?: string;
  role?: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Jay Mehta",
    place: "Ahmedabad, Gujarat",
    videoSrc: "/images/Video/Testimonial%20Jay%20mehta_1.mp4",
    avatar: "/images/Video/frames/vid_1_jay_mehta_3s.jpg",
    previewTime: 2.5
  },
  {
    id: 2,
    name: "Rajesh Sharma",
    place: "Surat, Gujarat",
    videoSrc: "/images/Video/Investor%20Testimonial.mp4",
    avatar: "/images/Video/frames/vid_2_investor_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 3,
    name: "Esther Khujur",
    place: "Vadodara, Gujarat",
    videoSrc: "/images/Video/C2933.mp4",
    avatar: "/images/Video/frames/vid_3_c2933_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 4,
    name: "Vikram Patel",
    place: "Delhi NCR",
    videoSrc: "/images/Video/IMG_8439%20(1).mp4",
    avatar: "/images/Video/frames/vid_4_img_8439_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 5,
    name: "Riya Malhotra",
    place: "Bengaluru, Karnataka",
    videoSrc: "/images/Video/VID-20261031-WA0000.mp4",
    avatar: "/images/Video/frames/vid_5_wa0000_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 6,
    name: "Suresh Reddy",
    place: "Pune, Maharashtra",
    videoSrc: "/images/Video/VID-20261103-WA0000%20(1)_1.mp4",
    avatar: "/images/Video/frames/vid_6_wa0000_1_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 7,
    name: "Amitabh Joshi",
    place: "Mumbai, Maharashtra",
    videoSrc: "/images/Video/WhatsApp%20Video%202026-11-03%20at%2016.09.32.mp4",
    avatar: "/images/Video/frames/vid_7_wa_160932_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 8,
    name: "Pooja Verma",
    place: "Jaipur, Rajasthan",
    videoSrc: "/images/Video/WhatsApp%20Video%202026-11-03%20at%2016.09.mp4",
    avatar: "/images/Video/frames/vid_8_wa_1609_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 9,
    name: "Sunil Choudhary",
    place: "Indore, Madhya Pradesh",
    videoSrc: "/images/Video/WhatsApp%20Video%202026-11-22%20at%2012.mp4",
    avatar: "/images/Video/frames/vid_9_wa_12_3s.jpg",
    previewTime: 1.5
  },
  {
    id: 10,
    name: "Ramesh & Gaurav Patel",
    place: "Rajkot, Gujarat",
    videoSrc: "/images/Video/WhatsApp%20Video%202026-11-03%20at%2016.09.32_1.mp4",
    avatar: "/images/Video/frames/vid_10_wa_160932_1_avatar.jpg",
    previewTime: 3.0
  }
];

export interface Article {
  id: string;
  author: string;
  createdAt: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
}

export const DUMMY_ARTICLES: Article[] = [
  {
    id: "1",
    author: "Elena Rostova",
    createdAt: "May 15, 2026",
    title: "The Architecture of Silence: Designing for Focus in a Noisy World",
    description:
      "In a world filled with constant distractions, the need for spaces that promote focus and concentration has never been greater. This article explores the principles of designing environments that minimize noise and enhance productivity.",
    content:
      "In the relentless visual and auditory cacophony of modern urban environments, the intentional absence of design elements has become a radical act. When we examine the latest civic structures emerging in Nordic capitals, we see a distinct shift away from structural bravado toward a profound, almost aggressive quietness. It is an architecture that demands less of our attention, offering space for thought rather than commanding reverence.\n\nThis reduction is not merely stylistic; it is programmatic. By stripping away extraneous ornamentation, architects are forcing a direct confrontation with space, light, and material. The concrete is left raw not for cost, but to register the passing of time through weathering. The glass is expansive not just for views, but to dissolve the boundary between the institution and the public realm.\n\nConsider the approach of contemporary minimalists. They do not view 'nothingness' as an empty void waiting to be filled, but as a material in itself. This philosophy traces its roots back to traditional Japanese aesthetics, where the concept of Ma—the negative space or interval—is understood to give shape to the whole. In modern workspace design, integrating silent zones allows professionals to reclaim their cognitive autonomy.",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    author: "Nadia Pratama",
    createdAt: "June 10, 2026",
    title: "The Art of Mindful Living: Embracing the Present Moment",
    description:
      "Mindfulness is more than just a buzzword; it's a way of life. This article delves into the benefits of mindful living and offers practical tips for incorporating mindfulness into your daily routine.",
    content:
      "Mindfulness is often misunderstood as a passive relaxation technique, but in practice, it demands active engagement with the present moment. In a fast-paced culture driven by instant gratification and constant notifications, cultivating a mindful lifestyle serves as an anchor for mental clarity and emotional resilience.\n\nLiving mindfully begins with small, intentional actions throughout the day. Whether it is savoring your morning tea without looking at a screen, or taking five deep breaths before responding to a stressful email, these micro-habits gradually retrain our attention span and lower chronic stress levels.\n\nUltimately, embracing mindfulness transforms how we interact with our environment and relationships. By learning to observe our thoughts without judgment, we create a healthy mental buffer between external stressors and our internal reactions, leading to a more centered and meaningful existence.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop",
  },
  {
    id: "3",
    author: "Raka Wijaya",
    createdAt: "June 5, 2026",
    title: "The Future of Urban Mobility: Innovations in Transportation",
    description:
      "As cities around the world grapple with congestion and pollution, innovative transportation solutions are emerging to reshape how we move. This article examines the latest trends in urban mobility and their potential impact on our daily lives.",
    content:
      "Urbanization is accelerating at an unprecedented rate, placing immense strain on legacy transportation infrastructure. Traffic congestion and vehicle emissions remain major bottlenecks for modern cities, driving urban planners and technologists to fundamentally rethink mobility.\n\nMicro-mobility solutions—such as integrated electric scooter networks and dedicated bike highways—are bridging the 'last-mile' gap in transit. Meanwhile, autonomous electric buses and smart traffic control systems leveraging AI are reducing transit times and cutting carbon footprints across major metropolitan centers.\n\nThe future of urban transport lies not in personal vehicle ownership, but in seamlessly connected, multi-modal transportation systems. Cities that prioritize pedestrian-friendly design and green transit will redefine livability for generations to come.",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop",
  },
  {
    id: "4",
    author: "Sophia Chen",
    createdAt: "July 01, 2026",
    title: "Digital Minimalism: Decluttering Your Virtual Life",
    description:
      "Learn how intentionally reducing screen time and digital distractions can lead to higher productivity, better mental health, and more meaningful real-world connections.",
    content:
      "Our digital devices were engineered to capture and hold our attention. With constant push notifications, endless social media feeds, and unread email threads, our attention spans are fragmented into tiny intervals. Digital minimalism offers a philosophy of technology use that puts values first.\n\nAdopting digital minimalism requires auditing your digital ecosystem. It is about intentionally selecting digital tools that support your goals while ruthlessly eliminating low-value distractions. Disabling unnecessary alerts and establishing phone-free sanctuary zones in your home are impactful first steps.\n\nBy reclaiming your attention from algorithmically driven feeds, you free up cognitive energy for deep work, real-world hobbies, and genuine interpersonal connection. Technology returns to its rightful place: a powerful tool that serves you, rather than a master that controls you.",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop",
  },
  {
    id: "5",
    author: "Marcus Vance",
    createdAt: "July 12, 2026",
    title: "Sustainable Architecture in Modern Megacities",
    description:
      "An in-depth look at how architects are integrating living ecosystems and renewable materials into high-rise urban structures to combat climate change.",
    content:
      "As high-rise developments continue to dominate urban skylines, architects face a crucial mandate: transforming energy-hungry skyscrapers into self-sustaining eco-structures. Sustainable architecture is evolving beyond basic solar panels into holistic, living design systems.\n\nBiophilic design principles are taking center stage, incorporating vertical forests, rainwater harvesting reservoirs, and smart glass facades that adjust transparency based on sunlight intensity. These elements regulate building temperatures naturally while improving indoor air quality for occupants.\n\nBy utilizing cross-laminated timber (CLT) alongside low-carbon concrete alternatives, modern developments dramatically lower their embodied carbon footprint. The skyscrapers of tomorrow will function less like static towers and more like self-contained, eco-balanced ecosystems.",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop",
  },
  {
    id: "6",
    author: "Aria Thorne",
    createdAt: "August 04, 2026",
    title: "The Psychology of Color in User Experience Design",
    description:
      "Discover how subtle choices in color palettes influence human behavior, trust, and decision-making processes across modern Web and Mobile applications.",
    content:
      "Color is one of the most immediate visual tools in digital product design. Before a user reads a single word on screen, color palettes communicate tone, brand credibility, and functional hierarchy on a subconscious level.\n\nUnderstanding color psychology enables UI/UX designers to direct user focus effectively. For instance, high-contrast call-to-action buttons leverage visual weight to drive conversion, while neutral slate and monochromatic palettes foster calm, focused reading environments for content-heavy sites.\n\nAccessibility is another crucial factor. Ensuring sufficient contrast ratios for low-vision users and accommodating color blindness are fundamental practices for inclusive product development. Thoughtful color selection bridges visual appeal with functional clarity.",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop",
  },
  {
    id: "7",
    author: "Liam O'Connor",
    createdAt: "August 18, 2026",
    title: "Crafting Coffee: The Science Behind the Perfect Brew",
    description:
      "From bean selection to extraction rates, explore the chemistry and precision required to craft an exceptional cup of artisanal coffee at home.",
    content:
      "Brewing coffee is equal parts culinary art and precise chemistry. Factors like water temperature, grind size uniformity, and brew ratio dramatically alter the extraction yield and flavor profile in your cup.\n\nWhen hot water comes into contact with ground coffee, it sequentially dissolves organic compounds: first fruit acids and aromatics, followed by sweet sugars, and finally bitter plant fibers. Achieving balance requires understanding and managing this extraction curve.\n\nInvesting in a quality burr grinder and using filtered water at around 90-96°C can instantly elevate home brewing. Experimenting with pour-over methods or immersion brewing allows enthusiasts to unlock complex origin notes hidden within single-origin beans.",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop",
  },
  {
    id: "8",
    author: "Maya Lin",
    createdAt: "August 29, 2026",
    title: "Navigating Remote Work: Strategies for Long-term Success",
    description:
      "Practical advice for distributed teams on building healthy boundaries, maintaining clear communication, and preventing burn-out while working asynchronously.",
    content:
      "The shift toward remote and hybrid work environments has unlocked unprecedented flexibility, but it has also blurred the boundaries between professional duties and personal life. Sustaining remote productivity over time requires intentional structures.\n\nAsynchronous communication is the bedrock of successful distributed teams. Documenting processes clearly in shared knowledge bases minimizes unnecessary meetings and allows team members to work during their most productive hours without constant interruptions.\n\nOn an individual level, establishing clear rituals—such as a dedicated workspace and a firm 'shutdown time' at the end of the day—prevents cognitive fatigue and burn-out. Remote work succeeds best when built on trust, clear deliverables, and healthy boundaries.",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop",
  },
  {
    id: "9",
    author: "Julian Thorne",
    createdAt: "September 02, 2026",
    title: "The Renaissance of Analog Photography",
    description:
      "Why creators in a hyper-digital age are returning to film cameras, celebrating slow processes, grain, and the tactile beauty of physical prints.",
    content:
      "In an era where smartphone cameras capture high-resolution images instantly, film photography is experiencing an unlikely revival among younger creative communities. This resurgence represents a deliberate move toward slow, intentional craftsmanship.\n\nUnlike digital photography, where hundreds of shots can be taken and reviewed instantly, a roll of 35mm film limits the photographer to 24 or 36 frames. This constraint forces careful composition, patience, and a deeper connection to the subject being captured.\n\nThe tactile experience of loading film, manually setting aperture and shutter speed, and waiting for developed physical prints creates a sense of surprise and permanence that instant digital files rarely replicate.",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop",
  },
];

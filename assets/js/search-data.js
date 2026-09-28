// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "publications in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-academic-reviewing",
          title: "Academic Reviewing",
          description: "Peer review contributions and editorial board memberships.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/reviewing/";
          },
        },{id: "news-paper-titled-efficient-analytical-derivatives-of-rigid-body-dynamics-using-spatial-vector-algebra-published-in-ieee-ra-l-2022",
          title: 'Paper titled Efficient Analytical Derivatives of Rigid-Body Dynamics using Spatial Vector Algebra published...',
          description: "",
          section: "News",},{id: "news-paper-titled-efficient-analytical-derivatives-of-rigid-body-dynamics-using-spatial-vector-algebra-accepted-to-icra-2022-conference-in-philadelphia-may-23-27-2022",
          title: 'Paper titled Efficient Analytical Derivatives of Rigid-Body Dynamics using Spatial Vector Algebra accepted...',
          description: "",
          section: "News",},{id: "news-awarded-the-ut-austin-professional-travel-award-for-graduate-students-to-attend-icra-2022",
          title: 'Awarded the UT Austin Professional Travel Award for graduate students to attend ICRA...',
          description: "",
          section: "News",},{id: "news-paper-titled-closed-form-second-order-partial-derivatives-of-rigid-body-inverse-dynamics-submitted-to-iros-2022-conference-pre-print-released",
          title: 'Paper titled Closed-Form Second-Order Partial Derivatives of Rigid-Body Inverse Dynamics submitted to IROS...',
          description: "",
          section: "News",},{id: "news-awarded-the-ieee-ras-travel-award-2022",
          title: 'Awarded the IEEE RAS travel award 2022.',
          description: "",
          section: "News",},{id: "news-passed-the-ph-d-oral-qualifying-and-moved-forward-to-candidacy",
          title: 'Passed the Ph.D. oral qualifying and moved forward to candidacy!',
          description: "",
          section: "News",},{id: "news-started-working-as-a-robotics-research-intern-summer-2022-at-flexiv-robotics-on-motion-planning-for-manipulators",
          title: 'Started working as a robotics research intern (Summer 2022) at Flexiv Robotics on...',
          description: "",
          section: "News",},{id: "news-analytical-second-order-partial-derivatives-of-rigid-body-inverse-dynamics-accepted-for-iros-2022-conference-in-kyoto-23-27th-oct-2022-pre-print",
          title: 'Analytical Second-Order Partial Derivatives of Rigid-Body Inverse Dynamics accepted for IROS 2022 conference...',
          description: "",
          section: "News",},{id: "news-received-the-warren-a-and-alice-l-meyer-endowed-scholarship-in-engineering-from-cockrell-school-of-engineering-ut-austin-for-year-2022-2023",
          title: 'Received the Warren A. and Alice L. Meyer Endowed Scholarship in Engineering from...',
          description: "",
          section: "News",},{id: "news-awarded-the-ut-austin-professional-and-the-ieee-iros-sdc-travel-award-to-attend-iros-2022",
          title: 'Awarded the UT Austin Professional, and the IEEE IROS-SDC Travel Award to attend...',
          description: "",
          section: "News",},{id: "news-our-paper-on-second-order-derivatives-of-rigid-body-dynamics-theory-amp-amp-implementation-is-conditionally-accepted-to-ieee-transactions-on-robotics-pre-print",
          title: 'Our paper “On Second-Order Derivatives of Rigid-Body Dynamics: Theory &amp;amp;amp; Implementation “ is...',
          description: "",
          section: "News",},{id: "news-new-paper-released-multi-shooting-differential-dynamic-programming-for-hybrid-systems-using-analytical-derivatives-under-review-for-ieee-humanoids-2023-pre-print",
          title: 'New paper released- “Multi-Shooting Differential Dynamic Programming for Hybrid Systems using Analytical Derivatives”...',
          description: "",
          section: "News",},{id: "news-ph-d-thesis-defended-successfully-starting-a-new-job-as-locomotion-control-engineer-at-shift-robotics-in-austin-tx",
          title: 'Ph.D. thesis defended successfully! Starting a new job as Locomotion Control Engineer at...',
          description: "",
          section: "News",},{id: "news-presented-our-paper-analytical-second-order-derivatives-of-rigid-body-contact-dynamics-application-to-multi-shooting-ddp-at-the-humanoids-conference-in-austin-tx",
          title: 'Presented our paper “Analytical Second-Order Derivatives of Rigid-Body Contact Dynamics: Application to Multi-Shooting...',
          description: "",
          section: "News",},{id: "news-our-paper-on-second-order-derivatives-of-rigid-body-dynamics-theory-amp-amp-implementation-got-published-in-ieee-transactions-on-robotics",
          title: 'Our paper “On Second-Order Derivatives of Rigid-Body Dynamics: Theory &amp;amp;amp; Implementation” got published...',
          description: "",
          section: "News",},{id: "news-we-released-a-paper-phasing-through-the-flames-rapid-motion-planning-with-the-aghf-pde-for-arbitrary-objective-functions-and-constraints-on-arxiv",
          title: 'We released a paper “Phasing Through the Flames: Rapid Motion Planning with the...',
          description: "",
          section: "News",},{id: "news-i-am-will-serving-as-the-associate-editor-for-the-icar-2025-conference-in-san-jaun-argentina",
          title: 'I am will serving as the Associate Editor for the ICAR 2025 conference...',
          description: "",
          section: "News",},{id: "news-excited-to-be-chosen-as-a-review-editor-for-the-frontiers-in-robotics-and-ai-humanoid-robotics",
          title: 'Excited to be chosen as a Review Editor for the Frontiers in Robotics...',
          description: "",
          section: "News",},{id: "news-excited-to-be-chosen-as-a-review-editor-for-the-international-journal-of-advanced-robotic-systems-sage",
          title: 'Excited to be chosen as a Review Editor for the International Journal of...',
          description: "",
          section: "News",},{id: "news-new-paper-published-in-frontiers-in-robotics-and-ai-imitation-learning-for-legged-robot-locomotion-a-survey-with-khojasteh-z-mirza",
          title: 'New paper published in Frontiers in Robotics and AI: “Imitation Learning for Legged...',
          description: "",
          section: "News",},{id: "news-new-preprint-on-arxiv-multi-robot-navigation-in-social-mini-games-definitions-taxonomy-and-algorithms-with-rohan-chandra-wenhao-luo-and-katia-sycara",
          title: 'New preprint on arXiv: “Multi-robot Navigation in Social Mini-Games: Definitions, Taxonomy, and Algorithms”...',
          description: "",
          section: "News",},{id: "news-new-paper-published-in-autonomous-robots-multi-robot-navigation-in-social-mini-games-definitions-taxonomy-and-algorithms-with-rohan-chandra-wenhao-luo-and-katia-sycara",
          title: 'New paper published in Autonomous Robots: “Multi-robot Navigation in Social Mini-Games: Definitions, Taxonomy,...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3",
          title: 'project 3',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%69%6E%67%68%32%38%31@%75%74%65%78%61%73.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/shubhamsingh91", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/singh281", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=-hbDYEIAAAAJ&hl", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Shubham-Singh-19/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

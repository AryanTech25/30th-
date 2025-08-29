import type { QuizData } from "@/components/quiz/quiz-component"

export const quizData: Record<string, Record<string, QuizData>> = {
  "1": {
    "module-1": {
  id: "ml-intro-quiz",
  title: "CS229 Introduction Quiz",
  description: "Test your understanding of CS229 course goals, policies, and ML basics",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "According to Andrew Ng, what is the primary goal of CS229 and broader AI impact?",
      options: [
        "Get a tech job and debug code",
        "Become an ML expert, build apps, do research, transform industries; AI is like 'new electricity'",
        "Memorize ML algorithms for academics",
        "Specialize only in deep learning",
      ],
      correctAnswer: 1,
      explanation:
        "CS229 aims to make students ML experts capable of research and impactful applications. Andrew Ng likens AI to 'new electricity' powering industries.",
    },
    {
      id: "q2",
      question: "What programming language shift happened in CS229?",
      options: [
        "Switch to C++",
        "From MATLAB/Octave to Python/NumPy",
        "Use Java for assignments",
        "No change in language",
      ],
      correctAnswer: 1,
      explanation:
        "Assignments shifted from MATLAB/Octave to Python with NumPy.",
    },
    {
      id: "q3",
      question: "What is the CS229 homework collaboration policy?",
      options: [
        "No study groups allowed",
        "Study groups allowed, but write final solutions independently",
        "Homework fully group-submitted",
        "Collaboration only for project",
      ],
      correctAnswer: 1,
      explanation:
        "Study groups are encouraged, but each student must write solutions independently without copying notes.",
    },
    {
      id: "q4",
      question: "What is the new midterm exam format in CS229?",
      options: [
        "Two timed midterms",
        "Midterm as group project",
        "Take-home midterm",
        "No midterm",
      ],
      correctAnswer: 2,
      explanation:
        "One major change is replacing the timed midterm with a take-home exam.",
    },
    {
      id: "q5",
      question: "How did Arthur Samuel define ML?",
      options: [
        "Program for math equations",
        "Field giving computers ability to learn without explicit programming",
        "System for board games",
        "Writing detailed instructions for a computer",
      ],
      correctAnswer: 1,
      explanation:
        "Arthur Samuel: ML is the field that gives computers the ability to learn without explicit programming.",
    },
    {
      id: "q6",
      question: "Key difference between regression and classification?",
      options: [
        "Regression → discrete values, classification → continuous",
        "Regression → continuous outputs, classification → discrete outputs",
        "Regression → unlabeled data, classification → labeled data",
        "Regression → multiple features, classification → one feature",
      ],
      correctAnswer: 1,
      explanation:
        "Regression predicts continuous outputs, classification predicts discrete outputs.",
    },
    {
      id: "q7",
      question: "What unique ability do SVMs with kernels provide?",
      options: [
        "Use single feature only",
        "Allow infinite input features",
        "Limit to 3 features",
        "Pick best 2 features automatically",
      ],
      correctAnswer: 1,
      explanation:
        "Kernel trick lets SVMs work in infinite-dimensional feature spaces.",
    },
    {
      id: "q8",
      question: "What defines an unsupervised learning problem?",
      options: [
        "Inputs and labeled outputs",
        "Maximize reward through trial/error",
        "Only inputs, no labels; goal is finding structure",
        "Mimicking humans to drive vehicles",
      ],
      correctAnswer: 2,
      explanation:
        "Unsupervised learning works with input-only data to uncover hidden structure.",
    },
    {
      id: "q9",
      question: "What analogy does Andrew Ng use for reinforcement learning?",
      options: [
        "Debugging software",
        "Training a dog with 'good dog'/'bad dog'",
        "Learning to ride a bike",
        "Playing checkers alone",
      ],
      correctAnswer: 1,
      explanation:
        "Reinforcement learning is like training a dog with rewards and penalties.",
    },
    {
      id: "q10",
      question: "How does CS229 compare to CS229a and CS230?",
      options: [
        "Most applied, focusing on deep learning",
        "Most mathematical, broader than applied CS229a or deep learning-focused CS230",
        "CS229a is most mathematical; CS229 is small, flipped format",
        "All three have same rigor and overlap",
      ],
      correctAnswer: 1,
      explanation:
        "CS229 is the most mathematical and broad; CS229a is more applied, CS230 focuses on deep learning.",
    },
  ],
},


    "module-2": {
      id: "supervised-learning-quiz",
      title: "Supervised Learning Quiz",
      description: "Test your knowledge of supervised learning algorithms and concepts",
      passingScore: 75,
      questions: [
        {
          id: "q1",
          question: "What is the main difference between classification and regression?",
          options: [
            "Classification predicts continuous values, regression predicts discrete values",
            "Classification predicts discrete categories, regression predicts continuous values",
            "There is no difference",
            "Classification is faster than regression",
          ],
          correctAnswer: 1,
          explanation:
            "Classification predicts discrete categories or classes (like spam/not spam), while regression predicts continuous numerical values (like house prices).",
        },
        {
          id: "q2",
          question: "Which algorithm is commonly used for linear regression?",
          options: ["Decision Tree", "K-Means", "Least Squares", "K-Nearest Neighbors"],
          correctAnswer: 2,
          explanation:
            "Least Squares is the most common method for fitting a linear regression model by minimizing the sum of squared residuals.",
        },
        {
          id: "q3",
          question: "What does overfitting mean in machine learning?",
          options: [
            "The model performs well on training data but poorly on new data",
            "The model performs poorly on training data",
            "The model is too simple",
            "The model trains too quickly",
          ],
          correctAnswer: 0,
          explanation:
            "Overfitting occurs when a model learns the training data too well, including noise and specific details, making it perform poorly on new, unseen data.",
        },
        {
          id: "q4",
          question: "Which metric is commonly used to evaluate classification models?",
          options: ["Mean Squared Error", "R-squared", "Accuracy", "Mean Absolute Error"],
          correctAnswer: 2,
          explanation:
            "Accuracy is a common metric for classification that measures the percentage of correct predictions out of total predictions.",
        },
        {
          id: "q5",
          question: "What is cross-validation used for?",
          options: [
            "To increase training speed",
            "To reduce model complexity",
            "To get a more reliable estimate of model performance",
            "To clean the data",
          ],
          correctAnswer: 2,
          explanation:
            "Cross-validation is used to get a more reliable and unbiased estimate of how well a model will perform on unseen data by testing it on multiple data splits.",
        },
      ],
    },
  },
  "3": {
    "module-1": {
      id: "rag-quiz",
      title: "Retrieval-Augmented Generation Quiz",
      description: "Test your understanding of RAG concepts and best practices",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What is the main purpose of Retrieval-Augmented Generation?",
          options: [
            "To compress large datasets",
            "To ground model outputs in external knowledge",
            "To increase GPU utilization",
            "To generate random text",
          ],
          correctAnswer: 1,
          explanation:
            "RAG augments a generative model with external documents or knowledge so outputs can be factually grounded and up-to-date.",
        },
        {
          id: "q2",
          question: "Which of the following is a key component of RAG?",
          options: ["Chunking content", "Reducing learning rate", "Model pruning", "Tokenization only"],
          correctAnswer: 0,
          explanation:
            "Chunking content is part of RAG where documents are split into semantic pieces to improve retrieval and context.",
        },
        {
          id: "q3",
          question: "Why is re-ranking used in RAG pipelines?",
          options: [
            "To reduce model size",
            "To improve precision by reordering retrieved chunks",
            "To train the embedding model",
            "To visualize attention",
          ],
          correctAnswer: 1,
          explanation:
            "Re-ranking is optionally used to improve precision by reordering the retrieved chunks before sending them to the model.",
        },
        {
          id: "q4",
          question: "What is a common limitation of RAG?",
          options: [
            "It can only process images",
            "Retrieval mistakes can mislead the model",
            "It doesn't require embeddings",
            "It works without any external data",
          ],
          correctAnswer: 1,
          explanation:
            "If retrieval returns irrelevant chunks, the model may produce incorrect or misleading outputs.",
        },
        {
          id: "q5",
          question: "Which best practice helps reduce latency and cost in RAG?",
          options: [
            "Cache common queries and embeddings",
            "Use extremely large chunks",
            "Avoid metadata",
            "Skip evaluation",
          ],
          correctAnswer: 0,
          explanation:
            "Caching common queries and embeddings reduces repeated computation and helps lower latency and cost.",
        },
      ],
    },

    "module-2": {
      id: "finetuning-quiz",
      title: "Fine-Tuning & Instruction Tuning Quiz",
      description: "Test your knowledge of fine-tuning and instruction tuning methods",
      passingScore: 75,
      questions: [
        {
          id: "q1",
          question: "What is the goal of instruction-tuning?",
          options: [
            "To optimize GPU usage",
            "To make models better at following instructions",
            "To reduce model size",
            "To generate random embeddings",
          ],
          correctAnswer: 1,
          explanation:
            "Instruction-tuning trains a model on (instruction, response) pairs to improve how well it follows user instructions.",
        },
        {
          id: "q2",
          question: "Which is a parameter-efficient fine-tuning technique?",
          options: ["LoRA", "Full weight update", "Random forest", "K-Means clustering"],
          correctAnswer: 0,
          explanation:
            "LoRA is a parameter-efficient fine-tuning method that adapts a small number of parameters instead of the full model.",
        },
        {
          id: "q3",
          question: "What is a tradeoff of full fine-tuning?",
          options: [
            "It cannot overfit",
            "It is computationally expensive and can overfit",
            "It preserves the base model fully",
            "It does not require data",
          ],
          correctAnswer: 1,
          explanation:
            "Full fine-tuning can strongly adapt the model but is expensive and risks overfitting on the training data.",
        },
        {
          id: "q4",
          question: "Why is data provenance important in fine-tuning?",
          options: [
            "To track hardware usage",
            "To ensure consent and compliance",
            "To speed up training",
            "To generate embeddings",
          ],
          correctAnswer: 1,
          explanation:
            "Data provenance ensures that training data has proper consent and follows policies, helping with governance and compliance.",
        },
        {
          id: "q5",
          question: "Which statement is true about PEFT?",
          options: [
            "It updates all model weights",
            "It reduces compute and preserves base model updates",
            "It eliminates the need for labeled data",
            "It only works for images",
          ],
          correctAnswer: 1,
          explanation:
            "PEFT adapts a small portion of parameters, reducing compute costs and preserving the original model weights.",
        },
      ],
    },

    "module-3": {
      id: "rlhf-quiz",
      title: "RLHF & Alignment Quiz",
      description: "Test your understanding of RLHF and model alignment techniques",
      passingScore: 70,
      questions: [
        {
          id: "q1",
          question: "What does RLHF stand for?",
          options: [
            "Reinforced Learning from Heuristic Feedback",
            "Reinforcement Learning from Human Feedback",
            "Random Learning High Fidelity",
            "Recursive Learning for Hyperparameters",
          ],
          correctAnswer: 1,
          explanation:
            "RLHF stands for Reinforcement Learning from Human Feedback, a technique to align models with human preferences.",
        },
        {
          id: "q2",
          question: "What is the purpose of a reward model in RLHF?",
          options: [
            "To generate embeddings",
            "To predict human preference scores",
            "To compress the dataset",
            "To train a decision tree",
          ],
          correctAnswer: 1,
          explanation:
            "The reward model predicts human preferences and guides the base model during RL optimization.",
        },
        {
          id: "q3",
          question: "Which is a potential challenge of RLHF?",
          options: [
            "Overfitting embeddings",
            "Reward hacking",
            "Low GPU memory",
            "Tokenization errors",
          ],
          correctAnswer: 1,
          explanation:
            "Models can game the reward signal in unintended ways, known as reward hacking.",
        },
        {
          id: "q4",
          question: "Which alternative simplifies RLHF optimization?",
          options: [
            "Direct Preference Optimization (DPO)",
            "Cross-Validation",
            "LoRA",
            "K-Means",
          ],
          correctAnswer: 0,
          explanation:
            "DPO is a simpler optimization method that avoids the complexity of full RL training.",
        },
        {
          id: "q5",
          question: "What is Constitutional AI?",
          options: [
            "Training without labels",
            "Using model-written principles to guide outputs",
            "A type of embedding model",
            "A data preprocessing technique",
          ],
          correctAnswer: 1,
          explanation:
            "Constitutional AI uses model-written critiques or rules to guide the outputs, reducing reliance on human feedback.",
        },
      ],
    },
  },
 
  
  "5": {
    "module-1": {
      "id": "genai-foundations-quiz",
      "title": "Foundations of Generative AI Quiz",
      "description": "Test your understanding of the basics of Generative AI, its evolution, and ethical considerations",
      "passingScore": 70,
      "questions": [
        {
          "id": "q1",
          "question": "What is Generative AI?",
          "options": [
            "AI that only analyzes existing data",
            "A subset of ML that generates new data such as text, images, or music",
            "A type of database",
            "A hardware accelerator for AI"
          ],
          "correctAnswer": 1,
          "explanation": "Generative AI creates new data like text, images, and music, unlike traditional AI which mainly analyzes existing data."
        },
        {
          "id": "q2",
          "question": "Which of the following is a key breakthrough in Generative AI?",
          "options": ["Decision Trees", "GANs", "K-Means Clustering", "Linear Regression"],
          "correctAnswer": 1,
          "explanation": "GANs (Generative Adversarial Networks) are a key breakthrough that allow realistic content generation by pitting a generator against a discriminator."
        },
        {
          "id": "q3",
          "question": "Which model type is commonly used in modern Generative AI for text generation?",
          "options": ["Convolutional Neural Networks", "Transformers", "Support Vector Machines", "Random Forests"],
          "correctAnswer": 1,
          "explanation": "Transformers, like GPT models, are the backbone of modern Generative AI for text and multimodal generation."
        },
        {
          "id": "q4",
          "question": "What is a primary ethical concern in Generative AI?",
          "options": [
            "Energy consumption",
            "Data privacy and bias",
            "Using supervised learning",
            "Overfitting models"
          ],
          "correctAnswer": 1,
          "explanation": "Generative AI may create biased content or violate privacy by generating data resembling sensitive datasets, making ethics crucial."
        },
        {
          "id": "q5",
          "question": "Which type of learning is primarily used in Generative AI models?",
          "options": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "All of the above"],
          "correctAnswer": 3,
          "explanation": "Generative AI can involve supervised learning, unsupervised learning, and reinforcement learning depending on the model and application."
        }
      ]
    }
  },


  
  "7": {
    "module-1": {
      "id": "foundations-of-genai-quiz",
      "title": "Foundations of Generative AI Quiz",
      "description": "Test your knowledge of the fundamentals of Generative AI based on the provided video and documentation.",
      "passingScore": 80,
      "questions": [
        {
          "id": "q1",
          "question": "Which of the following describes the evolution of Generative AI from early methods to modern techniques?",
          "options": [
            "It moved from complex deep learning models to simple statistical models.",
            "It progressed from rule-based systems, through statistical models, to deep learning models like Transformers.",
            "It started with Diffusion Models and then evolved into GANs and Transformers.",
            "The evolution was a single, linear progression from AI directly to Generative AI without intermediate stages."
          ],
          "correctAnswer": 1,
          "explanation": "The progression from handcrafted rules to statistical models and then to the more advanced deep learning architectures is the correct historical path."
        },
        {
          "id": "q2",
          "question": "According to the provided documentation, what is a key ethical consideration related to the use of Generative AI?",
          "options": [
            "Its potential to reduce a computer's processing speed.",
            "The requirement for extensive hand-crafted rules.",
            "The risk of generating and spreading misinformation or deepfakes.",
            "The difficulty in training models on unlabeled data."
          ],
          "correctAnswer": 2,
          "explanation": "The document highlights the risk of misinformation and deepfakes as a major ethical concern with AI-generated content."
        },
        {
          "id": "q3",
          "question": "Which mathematical concept is essential for the optimization process in deep learning?",
          "options": [
            "Integral calculus for calculating the area under a curve.",
            "Trigonometry for angle calculations.",
            "Linear algebra for matrix multiplication.",
            "Gradient descent for loss minimization."
          ],
          "correctAnswer": 3,
          "explanation": "Gradient descent is a key optimization algorithm used to minimize the loss function and improve model performance."
        },
        {
          "id": "q4",
          "question": "Which of the following best describes the role of a Discriminator in a Generative Adversarial Network (GAN)?",
          "options": [
            "It generates new, synthetic data based on the training set.",
            "It learns to differentiate between real data and data created by the Generator.",
            "It is an unsupervised learning model used for clustering data.",
            "It acts as the primary source of the training data for the entire network."
          ],
          "correctAnswer": 1,
          "explanation": "The Discriminator's role is to act as a classifier, distinguishing real data from the synthetic data produced by the Generator."
        },
        {
          "id": "q5",
          "question": "In the context of Machine Learning, what is the main difference between Supervised Learning and Unsupervised Learning?",
          "options": [
            "Supervised learning uses unlabeled data, while unsupervised learning uses labeled data.",
            "Supervised learning predicts future values, while unsupervised learning classifies data into categories.",
            "Supervised learning learns from labeled data, while unsupervised learning finds patterns in unlabeled data.",
            "There is no significant difference; they are interchangeable terms."
          ],
          "correctAnswer": 2,
          "explanation": "The key distinction is the presence of labeled data in supervised learning versus the absence of it in unsupervised learning, which is used for discovering hidden patterns."
        },
      ]
    }
  },

  
  "9": {
    "module-1": {
  id: "cyber-intro-quiz",
  title: "CS50 Cybersecurity Quiz",
  description: "Test your understanding of CS50's Introduction to Cybersecurity",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "Who is CS50's Introduction to Cybersecurity designed for?",
      options: [
        "Only programmers and technical experts",
        "Non-technical audiences only",
        "Both technical and non-technical audiences alike",
        "Cybersecurity professionals seeking advanced training",
      ],
      correctAnswer: 2,
      explanation:
        "The course is designed for both technical and non-technical audiences.",
    },
    {
      id: "q2",
      question: "How should cybersecurity primarily be viewed?",
      options: [
        "In absolute terms, as a state of perfect security",
        "Relatively, as a function of risks/rewards for adversaries and costs/benefits for you",
        "Solely as a matter of preventing all threats",
        "As an optional measure for non-critical systems",
      ],
      correctAnswer: 1,
      explanation:
        "Cybersecurity is best viewed relatively, balancing risks, rewards, costs, and benefits.",
    },
    {
      id: "q3",
      question: "Cybersecurity is recognized as a trade-off with?",
      options: [
        "Financial profit",
        "Advanced technology",
        "Usability itself",
        "Government regulations",
      ],
      correctAnswer: 2,
      explanation: "Cybersecurity often trades off against usability.",
    },
    {
      id: "q4",
      question: "What fundamental challenge highlights an adversary's advantage?",
      options: [
        "Adversaries always have more resources",
        "Adversaries are always more skilled",
        "Users must be perfect, adversary needs only one mistake",
        "Adversaries only target large organizations",
      ],
      correctAnswer: 2,
      explanation:
        "Defenders must protect all points, but adversaries only need to exploit one weakness.",
    },
    {
      id: "q5",
      question: "Beyond prevention, what should cybersecurity strategy focus on?",
      options: [
        "Outsourcing all security",
        "Detection via auditing and monitoring",
        "Relying only on advanced encryption",
        "Ignoring low-level threats",
      ],
      correctAnswer: 1,
      explanation:
        "Cybersecurity strategy must also focus on detection through auditing and monitoring.",
    },
    {
      id: "q6",
      question: "What methods help detect adversaries once inside?",
      options: [
        "Installing more powerful firewalls",
        "Auditing and monitoring",
        "Regularly changing passwords",
        "Disconnecting from the internet",
      ],
      correctAnswer: 1,
      explanation:
        "Auditing and monitoring are critical to detect adversaries post-breach.",
    },
    {
      id: "q7",
      question: "How can AI assist in cybersecurity?",
      options: [
        "Replace all human security personnel",
        "Automatically fix all vulnerabilities",
        "Detect hidden patterns in adversary behavior",
        "Predict future threats with 100% accuracy",
      ],
      correctAnswer: 2,
      explanation:
        "AI helps by spotting patterns in adversarial behavior that humans may overlook.",
    },
    {
      id: "q8",
      question: "What strategy may make an adversary lose interest?",
      options: [
        "Ignoring attempts",
        "Raising their cost/risk and lowering reward",
        "Publicly shaming them",
        "Changing IP addresses",
      ],
      correctAnswer: 1,
      explanation:
        "Increasing adversaries' costs and risks while lowering their potential rewards discourages attacks.",
    },
    {
      id: "q9",
      question: "What level of technical understanding does the course provide?",
      options: [
        "High-level only",
        "Low-level only for programmers",
        "Both high- and low-level, even for non-programmers",
        "No technical, only policy",
      ],
      correctAnswer: 2,
      explanation:
        "The course offers both conceptual and technical understanding, accessible to non-programmers.",
    },
    {
      id: "q10",
      question: "Why introduce 'first principles' of how computers work?",
      options: [
        "Prepare for advanced CS degrees",
        "Teach programming from scratch",
        "Understand/deduce how current and future threats work",
        "Show computing history",
      ],
      correctAnswer: 2,
      explanation:
        "First principles help learners deduce and understand how threats actually work.",
    },
  ]
},
    "module-2": {
  id: "ml-intro-quiz",
  title: "Securing Accounts Quiz - Foundational Concepts",
  description: "Test your understanding of authentication and account security basics",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "What is authentication in the digital world?",
      options: [
        "Granting access to resources",
        "Proving your identity",
        "Encrypting data",
        "Blocking unauthorized access",
      ],
      correctAnswer: 1,
      explanation:
        "Authentication is the process of proving your identity, usually before accessing a system.",
    },
    {
      id: "q2",
      question: "Which process comes after authentication?",
      options: ["Encryption", "Authorization", "Verification", "Auditing"],
      correctAnswer: 1,
      explanation:
        "Authorization follows authentication and determines what resources a user can access.",
    },
    {
      id: "q3",
      question: "What is commonly used for authentication?",
      options: [
        "IP addresses",
        "Usernames and passwords",
        "Encryption keys",
        "OTPs only",
      ],
      correctAnswer: 1,
      explanation:
        "Usernames and passwords remain the most common authentication method.",
    },
    {
      id: "q4",
      question: "Which of the following is public information in authentication?",
      options: ["Password", "OTP", "Username (like email)", "Encryption key"],
      correctAnswer: 2,
      explanation:
        "Usernames (such as email addresses) are public, while passwords and OTPs must remain secret.",
    },
    {
      id: "q5",
      question: "Passwords should generally be kept:",
      options: [
        "Public for recovery",
        "Private and secret",
        "Shared with friends",
        "Stored in plain text",
      ],
      correctAnswer: 1,
      explanation:
        "Passwords must be kept private and secret, never stored in plain text or shared.",
    },
  ],
},
    "module-3": {
  id: "ml-intro-quiz",
  title: "CS50 Cybersecurity – Lecture 1 (Securing Data)",
  description: "Test your knowledge of securing data concepts from Lecture 1",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "Why is storing passwords in plaintext considered insecure?",
      options: [
        "It makes login faster",
        "Anyone with database access can see all user passwords",
        "It prevents brute-force attacks",
        "It automatically encrypts the data",
      ],
      correctAnswer: 1,
      explanation:
        "If passwords are stored in plaintext, anyone with access to the database can read them directly.",
    },
    {
      id: "q2",
      question: "What is the main purpose of adding a salt before hashing a password?",
      options: [
        "To make the hash shorter",
        "To speed up authentication",
        "To ensure identical passwords generate different hashes",
        "To allow easy password recovery",
      ],
      correctAnswer: 2,
      explanation:
        "A salt ensures that two users with the same password will still have different hashes, preventing rainbow table attacks.",
    },
    {
      id: "q3",
      question: "Which of the following is an example of asymmetric key encryption?",
      options: ["AES", "Triple DES", "RSA", "Caesar Cipher"],
      correctAnswer: 2,
      explanation:
        "RSA is an asymmetric encryption algorithm that uses a public and private key pair.",
    },
    {
      id: "q4",
      question: "What does a digital signature primarily provide?",
      options: [
        "Faster encryption",
        "Verification of identity and integrity of data",
        "Data compression",
        "Password recovery",
      ],
      correctAnswer: 1,
      explanation:
        "Digital signatures ensure the sender’s identity and that the data has not been tampered with.",
    },
    {
      id: "q5",
      question: "Which of the following best describes full-disk encryption?",
      options: [
        "Only encrypts files marked as sensitive",
        "Encrypts all data on a storage device, accessible only after authentication",
        "Deletes data permanently by overwriting it",
        "Protects only data sent over the internet",
      ],
      correctAnswer: 1,
      explanation:
        "Full-disk encryption secures all data on the drive, and requires authentication before access.",
    },
  ],
},
    "module-4": {
  id: "ml-intro-quiz",
  title: "Cybersecurity Basics Quiz",
  description: "Test your understanding of cybersecurity fundamentals",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "What is the primary difference between HTTP and HTTPS?",
      options: [
        "HTTP is faster than HTTPS",
        "HTTPS requires username and password, HTTP does not",
        "HTTPS encrypts browser-server data, HTTP sends in plain text",
        "HTTP is for browsing, HTTPS for file transfers",
      ],
      correctAnswer: 2,
      explanation:
        "HTTPS encrypts communication between browser and server, unlike HTTP.",
    },
    {
      id: "q2",
      question: "What does Wi-Fi Protected Access (WPA) secure?",
      options: [
        "Encrypts traffic from device to entire internet",
        "Encrypts Wi-Fi traffic between device and local access point",
        "Blocks all malware over Wi-Fi",
        "Masks location for geo-restricted content",
      ],
      correctAnswer: 1,
      explanation:
        "WPA encrypts traffic between your device and the Wi-Fi router.",
    },
    {
      id: "q3",
      question: "Which malware spreads automatically over networks?",
      options: ["Virus", "Trojan horse", "Worm", "Ransomware"],
      correctAnswer: 2,
      explanation:
        "A worm can spread itself across systems without user action.",
    },
    {
      id: "q4",
      question: "How can a proxy monitor HTTPS traffic in an organization?",
      options: [
        "By port scanning devices",
        "By enforcing HSTS",
        "By requiring VPN use",
        "By installing its Certificate Authority on devices to impersonate sites",
      ],
      correctAnswer: 3,
      explanation:
        "With its CA installed, a proxy can decrypt and inspect HTTPS traffic.",
    },
    {
      id: "q5",
      question: "What is the main purpose of HSTS?",
      options: [
        "Alert users of phishing sites",
        "Enable packet inspection",
        "Force browsers to always use HTTPS for a site",
        "Block traffic by port numbers",
      ],
      correctAnswer: 2,
      explanation:
        "HSTS ensures browsers always use HTTPS, even if HTTP is requested.",
    },
  ],
},
    "module-5": {
  id: "ml-intro-quiz",
  title: "Web Security & Attacks Quiz",
  description: "Test your knowledge of common web attacks and defenses",
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "How can HTML be used to create a phishing link?",
      options: [
        "By encrypting the URL",
        "By hiding the link in CSS",
        "By showing a safe-looking text in <a> while href points to malicious site",
        "By renaming the browser’s address bar",
      ],
      correctAnswer: 2,
      explanation:
        "Attackers use <a> tags with deceptive text but malicious href links. Hovering reveals the real URL.",
    },
    {
      id: "q2",
      question: "Which are effective defenses against Cross-Site Scripting (XSS)?",
      options: [
        "Using only HTTPS",
        "Escaping dangerous symbols before rendering user input",
        "Using CSP headers to restrict script sources",
        "Enabling password managers",
      ],
      correctAnswer: 2,
      explanation:
        "Escaping user input and setting Content-Security-Policy headers are strong defenses against XSS.",
    },
    {
      id: "q3",
      question: "Which SQL injection input could bypass login authentication?",
      options: [
        "password123",
        "' OR '1'='1",
        "DROP TABLE users;",
        "<script>alert(1)</script>",
      ],
      correctAnswer: 1,
      explanation:
        "The classic injection `' OR '1'='1` always evaluates to true, bypassing login checks.",
    },
    {
      id: "q4",
      question: "Why is relying only on client-side validation insecure?",
      options: [
        "Browsers ignore attributes like disabled/required",
        "Adversaries can bypass or modify them using dev tools",
        "Users dislike filling forms",
        "Client-side code runs faster than server-side code",
      ],
      correctAnswer: 1,
      explanation:
        "Client-side checks can be bypassed with browser dev tools; validation must also happen server-side.",
    },
    {
      id: "q5",
      question: "How does a buffer overflow enable arbitrary code execution?",
      options: [
        "By encrypting memory values",
        "By flooding the CPU cache",
        "By overwriting the return address with malicious code location",
        "By tricking browsers into unsafe HTML rendering",
      ],
      correctAnswer: 2,
      explanation:
        "Overwriting the return address lets attackers redirect execution to their injected code.",
    },
  ],
}


    
  }
}


  


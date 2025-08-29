"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProgress } from "@/contexts/progress-context"
import { QuizComponent } from "@/components/quiz/quiz-component"
import { quizData } from "@/data/quiz-data"
import { ArrowLeft, Play, BookOpen, Brain, CheckCircle, Award } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import Link from "next/link"

// Mock module content data
const moduleContent = {
  "1": {
    "module-1": {
      title: "Introduction to ML",
      description: "Understanding the basics of machine learning and its applications",
      videoContent: {
        title: "What is Machine Learning?",
        duration: "15:30",
      //videoUrl: "https://example.com/video1",
       videoUrl: "https://www.youtube.com/embed/kXOsRyIVAdo",

      
        transcript: "Welcome to our introduction to machine learning course...",
      },
      documentation: {
        title: "Machine Learning Fundamentals",
        content: `
I. Introduction and Impact
• Course aim: Train students to become ML experts (build products, startups, research)
• AI as electricity: Like electricity 100 years ago, AI will transform every industry
• Opportunities: High demand in all fields – law, medicine, manufacturing, logistics, education
• Meaningful work: ML can improve healthcare, education, democracy, and society
• Right time: Today is one of the best times to enter ML

II. Course Logistics
• Enrollment: About 800 students, lectures recorded and online
• Teaching team: Andrew Ng with PhD TAs specialized in vision, NLP, robotics, etc
• Goal: Make students ML experts in 10 weeks for industry, research, or projects
• Content updates: Material changes yearly due to ML progress
• Prerequisites:

* CS basics: Big O, queues, stacks, trees
* Probability: random variables, expectation, variance
* Linear algebra: matrix, vectors, eigenvalues
* Review sessions on Fridays
  • Programming: Switched from MATLAB/Octave to Python/NumPy
  • Honor code: Group study allowed but answers must be written individually
  • Project:
* Best part of the class
* Team size 1–3 (4 if big scope)
* Apply ML to real problems in healthcare, art, engineering, literature, etc
  • Discussion sections:
* Fridays, recorded
* First weeks: review basics
* Later weeks: advanced topics such as convex optimization, HMMs, time series
  • Communication tools: Piazza for Q\&A, class email, Gradescope
  • Exams: Take-home midterm
  • Office hours: 60 hours per week to reduce crowding
  • Other courses:
* CS229: broad, mathematical ML
* CS229a: lighter math, applied, flipped classroom
* CS230: deep learning focused

III. Core ML Concepts

Definitions
• Arthur Samuel: Computers can learn without explicit programming
• Tom Mitchell: A program learns if performance on task T improves with experience E, measured by performance P

Major ML Categories

1. Supervised Learning
   • Learn mapping X to Y
   • Regression: predict continuous values such as house price
   • Classification: predict discrete labels such as tumor type
   • Algorithms: logistic regression, SVMs with kernels
   • Example: self-driving car learns steering (Y) from images (X)

2. Machine Learning Strategy
   • Systematic approach to ML projects
   • Helps with debugging, choosing algorithms, data, hardware
   • Andrew Ng writing a book on this

3. Deep Learning
   • Subset of ML focused on neural networks
   • Covered briefly in CS229, in depth in CS230

4. Unsupervised Learning
   • Only X given, no labels Y
   • K-means clustering groups similar data
   • Examples: Google News groups, genetics, market segmentation, astronomy, social networks
   • Cocktail Party Problem (ICA): separate overlapping voices
   • Less industry use today but big in research

5. Reinforcement Learning
   • Agent learns with rewards and penalties
   • Example: training a dog with good dog or bad dog feedback
   • Applications:

* Helicopter flight
* Robots climbing or playing games such as Atari and AlphaGo
* Logistics and robotics optimization
        `,
      },
    },
    "module-2": {
      title: "Supervised Learning",
      description: "Learn about classification and regression algorithms",
      videoContent: {
        title: "Supervised Learning Explained",
        duration: "22:45",
        videoUrl: "https://www.youtube.com/embed/t_y3f1V6--E",
        transcript: "In this module, we'll explore supervised learning algorithms...",
      },
      documentation: {
        title: "Supervised Learning Guide",
        content: `
# Supervised Learning

Supervised learning is a type of machine learning where algorithms learn from labeled training data to make predictions on new, unseen data.

## Classification vs Regression

### Classification
- Predicts discrete categories or classes
- Examples: Email spam detection, image classification
- Common algorithms: Logistic Regression, Decision Trees, Random Forest

### Regression
- Predicts continuous numerical values
- Examples: House price prediction, stock market forecasting
- Common algorithms: Linear Regression, Polynomial Regression, Support Vector Regression

## Key Algorithms

### 1. Linear Regression
Simple yet powerful algorithm for regression tasks.

### 2. Logistic Regression
Despite its name, used for classification problems.

### 3. Decision Trees
Easy to interpret and visualize decision-making process.

### 4. Random Forest
Ensemble method that combines multiple decision trees.

## Model Evaluation

- **Classification**: Accuracy, Precision, Recall, F1-Score
- **Regression**: Mean Squared Error, R-squared, Mean Absolute Error

## Practical Tips

1. Always split your data into training and testing sets
2. Use cross-validation for robust evaluation
3. Consider feature scaling for distance-based algorithms
4. Handle missing data appropriately
        `,
      },
    },
  },

  "3": {
    "module-1": {
      title: "Retrieval-Augmented Generation (RAG)",
      description: "RAG augments a generative model with external documents or knowledge so outputs can be factually grounded and up-to-date.",
      videoContent: { 
        title: "Introduction to RAG",
        duration: "20:00",
        videoUrl: "https://example.com/video-rag",
        transcript: "In this video, we explain Retrieval-Augmented Generation and its key components.",
      },
      documentation: {
        title: "RAG Detailed Guide",
        content: `
# Retrieval-Augmented Generation (RAG)

## Summary
RAG augments a generative model with external documents or knowledge so outputs can be factually grounded and up-to-date.

## Key Components
- Ingestion: parse and clean source documents (PDF, HTML, DOCX).
- Chunking: split content into semantic pieces (tune size & overlap).
- Embeddings: encode chunks into vectors using an embedding model.
- Indexing: store vectors in a vector DB (ANN index) and keep raw text in blob storage.
- Retrieval: form query embeddings, run nearest-neighbor search (top-k).
- Re-ranking: optionally re-rank results with a cross-encoder for precision.
- Prompt composition: pack retrieved chunks with system instructions and query.
- Grounding rules: force the model to cite chunks or return INSUFFICIENT_INFO if unsupported.

## Best Practices
- Tune chunk size (commonly 200–800 tokens) and use overlap to preserve context.
- Add metadata (source, timestamp, author) to support filters and citations.
- Use hybrid search (keyword + vector) for recall-sensitive tasks.
- Cache common queries and embeddings to reduce cost and latency.
- Evaluate grounding with a labeled test set and measure hallucination rates.

## Limitations
- Retrieval mistakes propagate—irrelevant chunks can mislead the model.
- Latency and storage costs for large corpora.
- Prompt length constraints require careful context packing and deduplication.
        `,
      },
    },




    "module-2": {
      title: "Fine-Tuning and Instruction Tuning",
      description: "Methods to adapt base models to domain-specific behavior or to follow instructions more reliably.",
      videoContent: {
        title: "Fine-Tuning Techniques",
        duration: "25:00",
        videoUrl: "https://example.com/video-finetuning",
        transcript: "This video covers full fine-tuning, parameter-efficient fine-tuning, and instruction-tuning.",
      },
      documentation: {
        title: "Fine-Tuning & Instruction Tuning Guide",
        content: `
# Fine-Tuning and Instruction Tuning

## Approaches
- Full fine-tuning: update model weights on a curated dataset.
- Parameter-efficient fine-tuning (PEFT): adapters, LoRA, or prefix tuning to reduce compute and storage.
- Instruction-tuning: supervised training on (instruction, response) pairs to make models better at following prompts.

## Tradeoffs
- Full fine-tuning yields strong adaptation but is expensive and can overfit.
- PEFT is cost-effective and preserves base model updates independently.
- Quality and cleanliness of labeled data are critical; noisy labels degrade behavior.

## Governance
- Keep training data provenance and consent records.
- Validate that fine-tuned behavior does not amplify bias or violate policies.
        `,
      },
    },

    "module-3": {
      title: "RLHF & Alignment",
      description: "Align model behavior with human preferences using reward models and human feedback.",
      videoContent: {
        title: "Introduction to RLHF",
        duration: "18:30",
        videoUrl: "https://example.com/video-rlhf",
        transcript: "Learn how Reinforcement Learning from Human Feedback aligns models with human preferences.",
      },
      documentation: {
        title: "RLHF and Alignment Guide",
        content: `
# Reinforcement Learning from Human Feedback (RLHF)

## Pipeline
- Collect pairwise preference data or fine-grained ratings from human annotators.
- Train a reward model that predicts human preference scores.
- Optimize the base model via RL (e.g., PPO) to maximize the reward model signal.
- Iterate: collect more data, refine the reward model, and re-optimize.

## Challenges
- Reward hacking: models can game the reward signal in unintended ways.
- Annotation cost: gathering high-quality human preferences is expensive and slow.
- Distributional bias: the reward model may reflect annotator biases.

## Alternatives & Variants
- Direct Preference Optimization (DPO): a simpler optimization method that avoids RL complexity.
- Constitutional AI: use model-written critiques or a set of principles to guide outputs.
        `,
      },
    },

    "module-4": {
      title: "Multimodal Models",
      description: "Models that process and generate multiple data types (text, image, audio, video, 3D).",
      videoContent: {
        title: "Introduction to Multimodal Models",
        duration: "22:00",
        videoUrl: "https://example.com/video-multimodal",
        transcript: "This video explains multimodal models and their capabilities.",
      },
      documentation: {
        title: "Multimodal Models Guide",
        content: `
# Multimodal Models

## Architectural Patterns
- Early fusion: combine modalities at input and jointly encode.
- Late fusion: encode modalities separately and combine representations later.
- Cross-attention and multimodal transformers: enable interactions between modality-specific tokens.

## Capabilities
- Image-captioning, caption-to-image, text-conditioned video generation, speech-to-text and vice versa.
- Multimodal reasoning: answer questions about images combined with text context.

## Challenges
- Alignment across modalities (semantics must match).
- Data scarcity for paired multimodal examples (especially video+text).
- Compute and memory costs for large multimodal transformers.
        `,
      },
    },

    // You can add more modules like agents, efficiency, evaluation, etc. similarly
  },
      "7": {
  "module-1": {
    title: "Foundations of Generative AI",
    description: "Learn the fundamentals of Generative AI, its evolution, key breakthroughs, and ethical considerations.",
    videoContent: {
      title: "Introduction to Generative AI",
      duration: "20:45",
      videoUrl: "https://example.com/video-genai1",
      transcript: `Welcome to the Foundations of Generative AI. In this module, we cover Artificial Intelligence, Machine Learning, and Generative AI, including types of ML, evolution from rule-based systems to modern transformers and diffusion models, key breakthroughs like GANs, Transformers, and Diffusion Models, core mathematical foundations, and ethical considerations for responsible AI.`,
    },
    documentation: {
      title: "Foundations of Generative AI Guide",
      content: `
# Foundations of Generative AI

Generative AI is a subset of Machine Learning that focuses on creating new data, including text, images, music, and more. It builds on AI and ML principles.

## 1. Introduction to AI & Machine Learning
- **Artificial Intelligence (AI)**: Systems that perform tasks requiring human intelligence.
- **Machine Learning (ML)**: Algorithms that improve performance from data over time.
- **Types of ML**:
  - **Supervised Learning**: Learning from labeled data.
  - **Unsupervised Learning**: Discover patterns from unlabeled data.
  - **Reinforcement Learning**: Learn through trial-and-error with rewards/penalties.
- **Generative AI**: Creates new data rather than just analyzing it.

## 2. Evolution of Generative AI – From Rules to Deep Learning
- **Rule-Based Systems (Pre-2000s)**: Handcrafted rules, limited creativity.
- **Statistical Models (2000s)**: N-grams, Markov chains; lacked long-term coherence.
- **Deep Learning Era (2010s onwards)**: Autoencoders, GANs, VAEs for content generation.
- **Modern Generative AI (2020s)**: Transformers (GPT, BERT, T5), Diffusion Models (DALL·E, Stable Diffusion), Multimodal AI.

## 3. Key Breakthroughs
- **GANs (2014)**: Generator vs Discriminator for realistic image synthesis.
- **Transformers (2017)**: Attention mechanisms, foundation of GPT, BERT, LLaMA.
- **Diffusion Models (2020+)**: Generate data by denoising noise for state-of-the-art media.

## 4. Core Mathematical Foundations
- **Linear Algebra**: Vectors, matrices, dot products, matrix multiplication.
- **Probability & Statistics**: Modeling uncertainty, distributions, Bayes' theorem.
- **Optimization**: Loss minimization, gradient descent, Adam, RMSprop.

## 5. Ethical Foundations and Responsible AI
- **Bias & Fairness**: Avoid amplifying biases in training data.
- **Misinformation & Deepfakes**: AI-generated content may spread false info.
- **Privacy & Data Use**: Consent, differential privacy, federated learning.
- **Responsible AI Principles**: Transparency, accountability, human-in-the-loop, safety.

## Conclusion
This module introduces the foundations of Generative AI, setting the stage for advanced techniques, multimodal systems, and hands-on projects in upcoming modules.
      `,
    },
  },
},


  "5": {
    "module-1": {
      "title": "Retrieval-Augmented Generation (RAG)",
      "description": "RAG augments a generative model with external documents or knowledge so outputs can be factually grounded and up-to-date.",
      "videoContent": {
        "title": "Introduction to RAG",
        "duration": "20:00",
        "videoUrl": "https://example.com/video-rag",
        "transcript": "In this video, we explain Retrieval-Augmented Generation and its key components."
      },
      "documentation": {
        "title": "RAG Detailed Guide",
        "content": "# Retrieval-Augmented Generation (RAG)\n\n## Summary\nRAG augments a generative model with external documents or knowledge so outputs can be factually grounded and up-to-date.\n\n## Key Components\n- Ingestion: parse and clean source documents (PDF, HTML, DOCX).\n- Chunking: split content into semantic pieces (tune size & overlap).\n- Embeddings: encode chunks into vectors using an embedding model.\n- Indexing: store vectors in a vector DB (ANN index) and keep raw text in blob storage.\n- Retrieval: form query embeddings, run nearest-neighbor search (top-k).\n- Re-ranking: optionally re-rank results with a cross-encoder for precision.\n- Prompt composition: pack retrieved chunks with system instructions and query.\n- Grounding rules: force the model to cite chunks or return INSUFFICIENT_INFO if unsupported.\n\n## Best Practices\n- Tune chunk size (commonly 200–800 tokens) and use overlap to preserve context.\n- Add metadata (source, timestamp, author) to support filters and citations.\n- Use hybrid search (keyword + vector) for recall-sensitive tasks.\n- Cache common queries and embeddings to reduce cost and latency.\n- Evaluate grounding with a labeled test set and measure hallucination rates.\n\n## Limitations\n- Retrieval mistakes propagate—irrelevant chunks can mislead the model.\n- Latency and storage costs for large corpora.\n- Prompt length constraints require careful context packing and deduplication."
      }
    },
    "module-2": {
      "title": "Foundations of Generative AI",
      "description": "Learn the fundamentals of Generative AI, its evolution, key breakthroughs, and ethical considerations.",
      "videoContent": {
        "title": "Introduction to Generative AI",
        "duration": "20:45",
        "videoUrl": "https://example.com/video-genai1",
        "transcript": "Welcome to the Foundations of Generative AI. We cover AI, ML, and Generative AI, including types of ML, evolution from rule-based systems to modern transformers and diffusion models, key breakthroughs like GANs, Transformers, and Diffusion Models, core mathematical foundations, and ethical considerations."
      },
      "documentation": {
        "title": "Foundations of Generative AI Guide",
        "content": "# Foundations of Generative AI\n\nGenerative AI is a subset of Machine Learning that focuses on creating new data, including text, images, music, and more.\n\n## Introduction to AI & Machine Learning\n- AI: Systems performing tasks requiring human intelligence\n- ML: Algorithms improving from data\n- Types: Supervised, Unsupervised, Reinforcement Learning\n- Generative AI: Creates new data\n\n## Evolution\n- Rule-based, Statistical Models, Deep Learning (GANs, VAEs), Modern Generative AI (Transformers, Diffusion Models)\n\n## Key Breakthroughs\n- GANs, Transformers, Diffusion Models\n\n## Mathematical Foundations\n- Linear Algebra, Probability & Statistics, Optimization\n\n## Ethics\n- Bias & Fairness, Misinformation, Privacy, Responsible AI Principles"
      }
    },
    "module-3": {
      "title": "Agentic AI Mastery",
      "description": "Master agentic AI techniques to design autonomous agents that perceive, plan, and act intelligently in complex environments.",
      "videoContent": {
        "title": "Agentic AI Basics",
        "duration": "25:10",
        "videoUrl": "https://example.com/video-agentic1",
        "transcript": "This video introduces agentic AI, autonomous agents, environments, decision-making processes, and the AI agent lifecycle."
      },
      "documentation": {
        "title": "Agentic AI Guide",
        "content": "# Agentic AI\n\nDesign autonomous agents that perceive, plan, and act intelligently.\n\n## Core Concepts\n- Agent, Environment, Perception, Action, Reward\n- Planning, Policy, Multi-Agent Systems\n\n## Applications\n- Autonomous robotics, Game AI agents, Simulation, Real-world decision systems"
      }
    }
  } ,

  
  "9": {
    "module-1": {
      "title": "Introduction to Cybersecurity",
      "description": "Understanding the fundamentals of cybersecurity, key concepts, threats, and roles.",
      "videoContent": {
        "title": "What is Cybersecurity?",
        "duration": "20:00",
        "videoUrl": "https://www.youtube.com/embed/kmJlnUfMd7I",
        "transcript": "Cybersecurity is the practice of protecting systems, networks, devices, applications, and data from digital attacks, unauthorized access, or damage. In today’s digital world, banking, healthcare, education, government services, and even household devices are connected, increasing exposure to cyber risk."
      },
      "documentation": {
        "title": "Cybersecurity Fundamentals",
        "content": `

        Notes on CS50 Cybersecurity – Introduction

        Core Objectives and Perspectives
      • Goal: Teach how to secure accounts, data, systems, and software against current threats
      • Equip participants to recognize and evaluate future threats at home and work
      • Preserve personal privacy
      • Cybersecurity viewed as relative, not absolute – based on risks and rewards for adversaries, and costs and benefits for you
      • Cybersecurity is a trade-off with usability

      Challenges and Strategic Approaches
    • Individuals must be “perfect” in security (lock all doors and windows), while adversaries only need to find one mistake
    • Focus not only on prevention but also on detection through auditing and monitoring
    • Detection allows quick response when an adversary gets in, reducing damage
    • Artificial Intelligence may help detect patterns in adversary behavior that humans miss
    • Strategy: raise the bar by increasing adversary cost and risk, while decreasing their reward
    • Acknowledgment: resourceful adversaries may still succeed

    Course Content and Approach
  • Course shows both high-level and low-level examples of threats
  • Designed for both technical and non-technical audiences
  • Provides technical knowledge needed to understand threats, even without programming background
  • Includes first principles of how computers work, enabling deduction of unseen or future threats
    notes 
        `
      }
    }, //dusra module
    "module-2": {
      "title": "Securing Accounts and Data",
      "description": "Learn best practices for securing user accounts, passwords, and sensitive data.",
      "videoContent": {
        "title": "Securing Accounts and Data",
        "duration": "1:13:06",
        "videoUrl": "https://www.youtube.com/embed/kUovJpWqEMk",
        "transcript": "In this module, we cover best practices for securing user accounts, passwords, and sensitive data. Topics include password hashing, multi-factor authentication, and data encryption."
      },
      "documentation": {
        "title": "Securing Accounts and Data Guide",
        "content": `

Notes on CS50 Cybersecurity – Lecture 0 – Securing Accounts

This lecture introduces fundamental concepts and practical defenses for securing digital accounts. The focus is on trade-offs between security and usability, and on viewing cybersecurity as relative, not absolute.

Core Concepts of Security
• Authentication: Proving who you are digitally
• Authorization: Determines whether you should have access once your identity is proven

Digital Keys: Usernames and Passwords
• Usernames: Often public, uniquely identify you
• Passwords: Kept private, main way to authenticate
• Challenge: Dozens or hundreds of accounts, each needing a unique and strong password

Threats to Passwords
• Dictionary attack: Tries common words, so avoid real words
• Brute force attack: Tries all possible combinations

4-digit numeric code: 10,000 possibilities, cracked in milliseconds

4-letter case-sensitive: ~7 million possibilities, cracked in seconds

4-character (letters, digits, punctuation): ~78 million, cracked in about a minute

8-character full set: ~6 quadrillion, much harder to crack
• Takeaway: Longer and more complex passwords greatly increase adversary cost and risk

NIST Recommendations for Password Defense
• Minimum length: At least 8 characters
• Permit long passwords: Up to 64 characters, all ASCII and Unicode allowed
• Prohibit compromised passwords: Check against breached lists, dictionary words, repetitive or sequential patterns, and context-specific terms
• No password hints accessible to unauthenticated users
• No forced periodic changes: Leads to predictable, weak patterns
• Rate-limiting: Limit failed attempts, e.g., lockout after 10 tries

Other Defenses Against Attacks
• Two-factor / multifactor authentication

Knowledge factor: Something you know (password)

Possession factor: Something you have (phone, key fob)

Inherence factor: Something you are (fingerprint, face)
• One-time passwords

SMS OTPs are less secure (SIM swapping risk)

Prefer authenticator apps or push notifications
• Be cautious with devices: Avoid untrusted computers (risk of keyloggers)
• Disable voice recognition authentication: AI deepfakes can mimic voices

Other Threats
• Credential stuffing: Reusing leaked credentials across sites, defense is unique passwords everywhere
• Social engineering: Tricking humans into revealing info, defense is skepticism
• Phishing: Fake emails or sites stealing data, defense is checking URLs and typing addresses directly
• Machine-in-the-middle (MITM): Malicious interception of communications, cryptography is the defense

Solutions for the Human Factor
• Single sign-on (SSO): Use accounts like Google or Facebook to log in elsewhere, reduces friction and leverages strong security of main account
• Password managers: Generate, store, and autofill unique strong passwords

Benefits: Strong random passwords, autofill prevents phishing, no need to memorize

Drawback: Must protect the manager itself with a strong master password

Recommendation: Use built-in OS managers or reputable third-party ones, start with most important accounts
• Passkeys: New technology using cryptographic pairs stored on your device, syncs across devices, removes need to remember passwords, more secure than traditional passwords
        `
      }
    }, //tisra module
    "module-4": {
      "title": "Network Security Basics",
      "description": "Understand the fundamentals of network security, including common threats and protective measures.",
      "videoContent": {
        "title": "Network Security Basics",
        "duration": "1:11:45",
        "videoUrl": "https://www.youtube.com/embed/9phdZjF8qOk",
        "transcript": "This module covers the fundamentals of network security, including common threats like eavesdropping, spoofing, and DDoS attacks, as well as protective measures such as firewalls, VPNs, and secure protocols."
      },
      "documentation": {
        "title": "Network Security Guide",
        "content": `
Notes on CS50 Cybersecurity – Lecture X – Network and System Security

• Wi-Fi Security

* Wi-Fi can be secured or unsecured; a padlock icon means encrypted
* WPA secures Wi-Fi by encrypting traffic between device and access point

• HTTP vs HTTPS

* HTTP is unencrypted, vulnerable to snooping and MITM attacks
* HTTPS encrypts traffic using TLS (successor to SSL) with public-key cryptography
* Digital certificates signed by trusted CAs verify authenticity of websites
* Browsers check signatures with hashes to confirm legitimacy

• Packet Sniffing

* Packets are virtual envelopes carrying internet data
* Sniffing reads packet contents if unencrypted
* Attackers can see sensitive data like searches or credit card numbers
* IP addresses visible in wireless traffic

• Session Hijacking

* Cookies maintain login sessions
* In HTTP, cookies are exposed and can be stolen
* HTTPS encrypts cookies, preventing theft

• SSL/TLS Stripping

* Tricks users into insecure HTTP or fake HTTPS sites
* Example: subtle URL changes
* Mitigation for users: always type https\://
* Mitigation for sites: use HSTS to enforce HTTPS, preload in browsers

• VPN (Virtual Private Network)

* Encrypts all internet traffic between device and VPN server
* Masks true IP address by showing VPN server location
* Secures data but privacy depends on VPN provider’s policies

• SSH (Secure Shell)

* Secure protocol to connect to and run commands on remote servers
* Encrypts all commands and data

• Port Numbers and Port Scanning

* Ports route traffic to specific services (80 HTTP, 443 HTTPS, 22 SSH)
* Port scanning checks all ports for open services
* Security by obscurity (non-standard ports) is weak defense

• Penetration Testing (Ethical Hacking)

* Red teams try to legally exploit vulnerabilities before attackers
* Blue teams defend
* Identifies weak passwords, open ports, and social engineering risks

• Firewalls

* Hardware or software barrier that blocks unwanted traffic
* Can filter by IP address or port
* Advanced firewalls use deep packet inspection to check contents for malware or policy violations

• Proxies

* Servers or software that sit between users and the internet
* Used to filter, block sites, or log activity
* If a company installs its own CA, it can intercept HTTPS traffic by acting as MITM
* URL rewriting can reroute links through proxy servers for inspection

• Malware

* Virus: Attaches to files, spreads via human action (e.g., opening attachments)
* Worm: Spreads automatically across networks by exploiting vulnerabilities
* Botnets: Networks of compromised machines controlled by an attacker

• Denial of Service (DoS) and Distributed DoS (DDoS)

* Flood a server with requests to deny service to legitimate users
* DDoS uses botnets from many IPs, making blocking harder

• Defenses Against Malware

* Antivirus software: Detects and removes known threats, requires updates
* Automatic updates: Patch vulnerabilities in OS and apps
* Zero-day attacks: Exploit unknown vulnerabilities with no patch available
* Layered defense: Use multiple protections (passwords, HTTPS, firewalls, antivirus, updates) for stronger security
`
     }
     },
    "module-3": {
      "title": "Malware and Threats",
      "description": "Learn about different types of malware, how they operate, and strategies for defense.",
      "videoContent": {
        "title": "Understanding Malware",
        "duration": "1:12:30",
        "videoUrl": "https://www.youtube.com/embed/X3DVaMnl5n8",
        "transcript": "In this module, we explore various types of malware such as viruses, worms, trojans, ransomware, and spyware. We discuss how they operate and strategies for defense including antivirus software, regular updates, and user education."
      },
      "documentation": {
        "title": "Malware and Threats Guide",
        "content": `Here’s your lecture notes rewritten in **one font only, no bold/italics, only bullets and indentation** style, consistent with your earlier request:

---

CS50 Cybersecurity - Lecture 1 - Securing Data: Notes
This lecture focuses on securing data, building upon previous discussions about account security and passwords.

I. Password Storage and Hashing
• The problem with storing passwords in clear text
◦ Servers or applications store passwords long-term for authentication
◦ A simple text file storing username\:password pairs is a common, but bad, way to store passwords
◦ If a website's database is hacked, an adversary gains immediate access to all usernames and passwords
◦ This enables credential stuffing attacks, where adversaries try these stolen credentials on other systems, assuming users reuse passwords
◦ Administrators should minimize fallout from a database compromise

• Hashing as a solution
◦ Hashing is a technique to convert a password into a hash or hash value, which is a cryptic, fixed-length string of text
◦ Instead of storing cleartext passwords, the hash value is stored in the database
◦ Hash function is an algorithm that takes an input (password) and produces a hash (output)
◦ Benefits of hashing
▪ If a server is hacked, adversaries only get hashes, not actual passwords, increasing their work to crack them
▪ Raises the bar for adversaries, making attacks more costly in time, resources, and risk

• Characteristics of good hash functions
◦ Should output cryptic and unguessable values, not leaking information
◦ Should produce different hash values for different passwords
◦ One-way function, generally irreversible
▪ Because many possible passwords map to a smaller output space, collisions can occur
◦ Fixed length output regardless of input length
◦ Cryptographic hash functions like SHA-2 and SHA-3 are used in practice

• Authentication with hashing
◦ At registration, the server hashes the password and stores only the hash with username
◦ At login, the server hashes the entered password and compares to the stored hash

• Weaknesses of hashing
◦ Dictionary attacks: adversaries hash common words and compare
◦ Brute-force attacks: adversaries try all possible combinations
◦ Rainbow tables: pre-computed lookup of passwords and hashes
◦ Same password gives same hash, leaking that multiple users share the same password

• Salting
◦ Salt is a random string added to the password before hashing
◦ Each user has a unique salt value, stored along with the hash
◦ Authentication repeats the process with salt + entered password
◦ Salting prevents rainbow table attacks and avoids identical hashes for identical passwords

• Best practices for hashing
◦ Do not invent hash functions, use vetted libraries
◦ Use modern functions with long outputs
◦ NIST recommends salting and hashing with one-way key derivation functions

• Unsecure password practices
◦ If a site can email you your original password, it means cleartext storage and should be avoided
◦ Companies have obligations to disclose leaks, though details vary

II. Cryptography: Codes and Ciphers
• Cryptography is the study of securing data, at rest or in transit

• Codes
◦ Codes map code words to plaintext, using a codebook
◦ Disadvantage: cumbersome, single point of failure if book is stolen

• Ciphers
◦ Algorithmic, operate on letters or bits
◦ Encipher/encrypt: plaintext to ciphertext
◦ Decipher/decrypt: ciphertext to plaintext
◦ Keys customize the algorithm, making it secure and unique
◦ Best practice: use public, well-tested algorithms, keep keys secret
◦ Caesar cipher shifts letters by fixed amount, weak due to small key space
◦ ROT13 is a simple variant used for scrambling, not security

• Symmetric key cryptography
◦ Sender and receiver share the same key for encryption and decryption
◦ Challenge: establishing shared key securely in advance
◦ Examples: AES and Triple DES

III. Public Key (Asymmetric) Cryptography
• Uses two mathematically related keys, public and private
◦ Public key can be shared, private key is secret
◦ One key encrypts, the other decrypts

• Process
◦ Sender encrypts with recipient’s public key
◦ Recipient decrypts with private key

• Solves shared secret problem since no pre-shared key is required

• Examples: RSA, Diffie-Hellman, MQV, DSA, ECDSA
◦ RSA uses difficulty of factoring large primes
◦ Diffie-Hellman allows two parties to establish a shared secret using modular arithmetic, then use symmetric cipher for communication

IV. Digital Signatures
• Purpose: verify authenticity and integrity of data

• Signing process

1. Sender generates a hash of message
2. Sender encrypts the hash with their private key
3. This encrypted hash is the digital signature
4. Sender sends message and signature

• Verification process

1. Recipient receives message and signature
2. Recipient generates hash of message
3. Recipient uses sender’s public key to decrypt signature
4. If both hashes match, authenticity is confirmed

• Relies on private key secrecy and trusted distribution of public keys

V. Passkeys (Web Authentication)
• Goal: passwordless login using public/private key cryptography

• Registration
◦ Device generates key pair
◦ Public key sent to server, private key stays on device

• Login
◦ Server sends challenge to device
◦ Device signs challenge with private key
◦ Server verifies with stored public key

• Advantage: no need for memorized passwords
• Challenge: requires device sync and widespread adoption

VI. Securing Data in Transit and At Rest
• Encryption in transit protects data between points, e.g. HTTPS
◦ Limitation: intermediaries like Gmail servers may still see plaintext

• End-to-end encryption (E2EE) ensures only sender and receiver can read data

• Secure deletion overwrites files to prevent recovery

• Full-disk encryption encrypts storage when not in use
◦ Protects data if device is stolen or resold
◦ Downside: ransomware attackers may encrypt data and demand payment

VII. Quantum Computing and Security
• Qubits can represent multiple states simultaneously
• Quantum computing may break current cryptography by enabling faster brute-force or factoring
• Future algorithms must evolve to remain secure

---

Do you want me to now reformat **all your CS50 Cybersecurity notes (Lecture 0 → Lecture 1 so far)** into this **one consistent style**, so you’ll have a clean single document for study?
 `
      }
    },
    "module-5": {
      "title": "Cryptography Essentials",
      "description": "Explore the basics of cryptography, including encryption methods, hashing, and digital signatures.",
      "videoContent": {
        "title": "Cryptography Basics",
        "duration": "1:15:00",
        "videoUrl": "https://www.youtube.com/embed/5rsKrTh3fAo",
        "transcript": "This module introduces the basics of cryptography, covering symmetric and asymmetric encryption, hashing algorithms, and digital signatures. We discuss how these techniques protect data integrity, confidentiality, and authenticity."
      },
      "documentation": {
        "title": "Cryptography Essentials Guide",
        "content": `Perfect 👍 I’ll reformat your “Securing Software” lecture into the same clean, single-font, bullet-only style to match the earlier notes:

---

Notes on CS50 Cybersecurity – Lecture X – Securing Software

• Theme: Securing software you use or write, with emphasis on mistrusting user input

• HTML Basics and Phishing

* HTML uses tags like <p>, <a>, <script> to define structure and behavior
* Links use <a href="...">text</a>, where href is the actual destination
* Phishing can disguise a malicious link under trusted text
* Users should hover over links to reveal true destination
* Adversaries create fake sites to steal credentials
* Use of raw IP addresses in URLs can be suspicious

• Code Injection Attacks

* Cross-Site Scripting (XSS)

  * Website executes adversary’s injected code
  * Reflected XSS: server reflects malicious input back (e.g., <script> tags in URL)
  * Stored XSS: malicious input saved and shown to other users later
  * Mitigations:
    • Escape dangerous characters (< > & " ') into HTML entities
    • Use Content-Security-Policy headers to restrict sources
    • Disabling JavaScript is impractical for most users

* SQL Injection

  * User input directly concatenated into SQL queries
  * Example: adversary inputs malan'; DELETE FROM users; -- to delete data
  * Example: login bypass with ' OR '1'='1 to force query true
  * Mitigations:
    • Use prepared statements with placeholders
    • Restrict database user permissions to limit damage

* Command Injection

  * Occurs when user input is passed directly to system commands
  * Adversary can append commands with special characters like semicolons
  * Mitigation: escape or sanitize input before executing system calls

• Client-Side vs Server-Side Validation

* Users can bypass client-side checks with developer tools
* Client-side validation improves user experience but is not secure
* Server-side validation is essential and final authority
* Always prioritize server-side validation

• Cross-Site Request Forgery (CSRF)

* Tricks logged-in users into unintended actions
* GET vulnerability: unsafe for state changes, can be embedded in <img> tags
* POST vulnerability: adversaries auto-submit hidden forms with JavaScript
* Mitigation: CSRF tokens, unique per user and request, validated by server

• Arbitrary/Remote Code Execution (Buffer Overflow)

* Adversary forces execution of injected code by overflowing memory buffer
* Stack stores return addresses; overflow can overwrite them
* Crafted input places malicious code plus fake return address
* Results in program executing adversary’s instructions
* Consequences: deleting files, bypassing security, sending spam, software cracking

• General Software Security Practices

* Open-source: public auditing possible, but exposes weaknesses
* Closed-source: hidden code, but no community review
* Download only from trusted app stores with security screening
* Use digital signatures and hashes to verify authenticity and integrity
* Package managers use similar verification
* Bug bounties encourage ethical disclosure of vulnerabilities
* Vulnerability tracking systems:
  • CVE – Common Vulnerabilities and Exposures
  • CVSS – Common Vulnerability Scoring System
  • EPSS – Exploit Prediction Scoring System
  • KEV – Known Exploited Vulnerabilities catalog

---

Do you want me to now **merge all three lectures (Introduction + Network Security + Securing Software)** into one master notes document for you, so it grows lecture by lecture?
 `
      }
    },
    "module-6": {
      "title": "Cryptography Essentials",
      "description": "Explore the basics of cryptography, including encryption methods, hashing, and digital signatures.",
      "videoContent": {
        "title": "Cryptography Basics",
        "duration": "1:15:00",
        "videoUrl": "https://www.youtube.com/embed/6IeqJtudKnk",
        "transcript": "This module introduces the basics of cryptography, covering symmetric and asymmetric encryption, hashing algorithms, and digital signatures. We discuss how these techniques protect data integrity, confidentiality, and authenticity."
      },
      "documentation": {
        "title": "Cryptography Essentials Guide",
        "content": `... `
      }
    },



     

  }
};






export default function ModulePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = params.id as string
  const moduleId = params.moduleId as string
  const contentType = searchParams.get("content") || "video"

  const [activeTab, setActiveTab] = useState(contentType)


  const { getModuleProgress, markVideoWatched, markDocumentationRead, completeQuiz, isQuizUnlocked } = useProgress()

  const moduleData =
    moduleContent[courseId as keyof typeof moduleContent]?.[
      moduleId as keyof (typeof moduleContent)[keyof typeof moduleContent]
    ]

  const quiz = quizData[courseId]?.[moduleId]

  const moduleProgress = getModuleProgress(courseId, moduleId)
  const quizUnlocked = isQuizUnlocked(courseId, moduleId)

  // Add local state for retake
  const [isRetakingQuiz, setIsRetakingQuiz] = useState(false)
  const [moduleCompletedOpen, setModuleCompletedOpen] = useState(false)
  const [remainingRequiredModules, setRemainingRequiredModules] = useState(0)
  const [quizCompletedOpen, setQuizCompletedOpen] = useState(false)
  const [nextModuleId, setNextModuleId] = useState<string | null>(null)
  const [isLastModule, setIsLastModule] = useState(false)

  useEffect(() => {
    setActiveTab(contentType)
  }, [contentType])

  if (!moduleData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Button asChild>
            <Link href={`/courses/${courseId}`}>Back to Course</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleVideoComplete = () => {
    markVideoWatched(courseId, moduleId)
  }

  const handleDocumentationComplete = () => {
    markDocumentationRead(courseId, moduleId)
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    completeQuiz(courseId, moduleId, score)
    
    // Find next module or determine if this is the last one
    const courseModules = Object.keys(moduleContent[courseId as keyof typeof moduleContent] || {})
    const requiredModules = courseModules.filter((id) => id !== "practice-labs")
    const currentIndex = requiredModules.indexOf(moduleId)
    
    if (currentIndex !== -1 && currentIndex < requiredModules.length - 1) {
      // Not the last module, set next module
      setNextModuleId(requiredModules[currentIndex + 1])
      setIsLastModule(false)
    } else {
      // This is the last module
      setNextModuleId(null)
      setIsLastModule(true)
    }
    
    setQuizCompletedOpen(true)
  }

  // When this module flips to completed and course not fully done, show a popup
  useEffect(() => {
    if (!moduleProgress?.completed) return
    if (moduleId === "practice-labs") return

    const courseModules = Object.keys(moduleContent[courseId as keyof typeof moduleContent] || {})
    const requiredModules = courseModules.filter((id) => id !== "practice-labs")

    const completedRequiredCount = requiredModules.filter((id) => {
      const m = getModuleProgress(courseId, id)
      return !!(m && m.completed)
    }).length

    const remaining = Math.max(requiredModules.length - completedRequiredCount, 0)
    setRemainingRequiredModules(remaining)

    if (remaining > 0) {
      setModuleCompletedOpen(true)
    }
  }, [moduleProgress?.completed])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/courses/${courseId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{moduleData.title}</CardTitle>
                  <CardDescription>{moduleData.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {moduleProgress?.videoWatched && (
                    <Badge variant="default" className="bg-green-600">
                      <Play className="mr-1 h-3 w-3" />
                      Video Complete
                    </Badge>
                  )}
                  {moduleProgress?.documentationRead && (
                    <Badge variant="default" className="bg-blue-600">
                      <BookOpen className="mr-1 h-3 w-3" />
                      Docs Complete
                    </Badge>
                  )}
                  {moduleProgress?.quizCompleted && (
                    <Badge variant="default" className="bg-purple-600">
                      <Brain className="mr-1 h-3 w-3" />
                      Quiz Complete ({moduleProgress.quizScore}%)
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Video
                    {moduleProgress?.videoWatched && <CheckCircle className="h-3 w-3 text-green-600" />}
                  </TabsTrigger>
                  <TabsTrigger value="documentation" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                    {moduleProgress?.documentationRead && <CheckCircle className="h-3 w-3 text-green-600" />}
                  </TabsTrigger>
                  <TabsTrigger value="quiz" disabled={!quizUnlocked} className="flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Quiz
                    {moduleProgress?.quizCompleted && <CheckCircle className="h-3 w-3 text-green-600" />}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{moduleData.videoContent.title}</CardTitle>
                      <CardDescription>Duration: {moduleData.videoContent.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Video Player Placeholder */}
                      {moduleData.videoContent.videoUrl ? (
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 overflow-hidden">
                          <iframe
                            className="w-full h-full"
                            src={moduleData.videoContent.videoUrl}
                            title="Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                          <Play className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600 dark:text-slate-400">Video Player</p>
                        </div>
                      )}

                      {!moduleProgress?.videoWatched && (
                        <Button onClick={handleVideoComplete} className="w-full">
                          Mark Video as Watched
                        </Button>
                      )}

                      {/* Transcript */}
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Transcript</h3>
                        <p className="text-sm text-muted-foreground">{moduleData.videoContent.transcript}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documentation" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{moduleData.documentation.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">{moduleData.documentation.content}</pre>
                      </div>

                      {!moduleProgress?.documentationRead && (
                        <Button onClick={handleDocumentationComplete} className="w-full mt-6">
                          Mark Documentation as Read
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz" className="mt-6">
                  {quizUnlocked && quiz ? (
                    <QuizComponent
                      quiz={quiz}
                      onComplete={(score, passed) => {
                        handleQuizComplete(score, passed)
                        setIsRetakingQuiz(false)
                      }}
                      onRetry={() => setIsRetakingQuiz(true)}
                      isCompleted={isRetakingQuiz ? false : moduleProgress?.quizCompleted}
                      previousScore={isRetakingQuiz ? undefined : moduleProgress?.quizScore}
                    />
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>Module Quiz</CardTitle>
                        <CardDescription>Complete the video and documentation first to unlock the quiz</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <div className="text-muted-foreground">
                            Complete the video and documentation to unlock the quiz
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Module Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Video</span>
                {moduleProgress?.videoWatched ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Documentation</span>
                {moduleProgress?.documentationRead ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Quiz</span>
                {moduleProgress?.quizCompleted ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">{moduleProgress.quizScore}%</span>
                  </div>
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={activeTab === "video" ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveTab("video")}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Video
              </Button>
              <Button
                variant={activeTab === "documentation" ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveTab("documentation")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Read Documentation
              </Button>
              <Button
                variant={activeTab === "quiz" ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setActiveTab("quiz")}
                disabled={!quizUnlocked}
              >
                <Brain className="mr-2 h-4 w-4" />
                Take Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Quiz completion dialog */}
      <AlertDialog open={quizCompletedOpen} onOpenChange={setQuizCompletedOpen}>
        <AlertDialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Quiz Completed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              {isLastModule 
                ? "You've completed all required modules for this course!" 
                : `Great job! You've completed "${moduleData.title}". Ready for the next module?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel onClick={() => setQuizCompletedOpen(false)}>Stay Here</AlertDialogCancel>
            <AlertDialogAction asChild>
              {isLastModule ? (
                <Link href={`/courses/${courseId}`}>Complete Course</Link>
              ) : (
                <Link href={`/courses/${courseId}/modules/${nextModuleId}`}>Next Module</Link>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Module completion dialog */}
      <AlertDialog open={moduleCompletedOpen} onOpenChange={setModuleCompletedOpen}>
        <AlertDialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Module Completed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              You finished "{moduleData.title}". {remainingRequiredModules > 0 ? `${remainingRequiredModules} required module${remainingRequiredModules===1?"":"s"} remaining to finish this course.` : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel onClick={() => setModuleCompletedOpen(false)}>Keep Learning</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href={`/courses/${courseId}`}>Go to Course</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

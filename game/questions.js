const questions = [
    {
        question: "What is the primary goal of \"Prompt Engineering\"?",
        options: [
            "To write the shortest possible prompts.",
            "To design high-quality prompts that guide LLMs to produce accurate outputs.",
            "To make LLMs write poetry.",
            "To increase the LLM's training data."
        ],
        answer: 1,
        explanation: "Prompt engineering is all about crafting effective prompts to get the desired, accurate responses from an LLM."
    },
    {
        question: "If you want an LLM to give a very predictable and deterministic answer, what \"Temperature\" setting would you typically use?",
        options: [
            "A very high temperature (e.g., 0.9)",
            "A moderate temperature (e.g., 0.5)",
            "A temperature of 0.",
            "Temperature doesn't affect predictability."
        ],
        answer: 2,
        explanation: "A temperature of 0 makes the LLM choose the highest probability token, leading to deterministic (predictable) output."
    },
    {
        question: "What type of prompting provides the LLM with a task description but *no* examples?",
        options: [
            "Few-shot prompting",
            "One-shot prompting",
            "Zero-shot prompting",
            "System prompting"
        ],
        answer: 2,
        explanation: "Zero-shot prompting gives the LLM a task directly without any illustrative examples."
    },
    {
        question: "You're asking an LLM to parse customer pizza orders into JSON. You provide it with three examples of orders and their corresponding JSON outputs. What prompting technique is this?",
        options: [
            "Zero-shot prompting",
            "Role prompting",
            "Few-shot prompting",
            "Contextual prompting"
        ],
        answer: 2,
        explanation: "Few-shot prompting involves giving the LLM multiple examples (typically 3-5) to demonstrate the desired input-output pattern."
    },
    {
        question: "Which LLM configuration setting helps control the randomness of the output by selecting only from the top K most likely next tokens?",
        options: [
            "Output Length",
            "Temperature",
            "Top-K",
            "Top-P"
        ],
        answer: 2,
        explanation: "Top-K sampling restricts the LLM's choice of the next token to the K tokens with the highest predicted probabilities."
    },
    {
        question: "\"Act as a travel guide. I will write to you about my location and you will suggest 3 places to visit near me.\" This is an example of:",
        options: [
            "System prompting",
            "Role prompting",
            "Zero-shot prompting",
            "Code prompting"
        ],
        answer: 1,
        explanation: "Role prompting assigns a specific persona or character (like a travel guide) to the LLM to influence its response style and content."
    },
    {
        question: "If you set \"Top-P\" (nucleus sampling) to 0, what is the likely behavior of the LLM?",
        options: [
            "It will consider all possible tokens.",
            "It will behave like greedy decoding, selecting only the most probable token.",
            "It will produce highly random and creative output.",
            "It will refuse to generate any output."
        ],
        answer: 1,
        explanation: "Setting Top-P to 0 (or a very small value) means only the token(s) that make up that tiny cumulative probability (effectively the single most probable token) are considered, similar to greedy decoding."
    },
    {
        question: "According to the paper, what is a potential issue if an LLM's output length is too short, and how should you address it?",
        options: [
            "The LLM becomes too creative; reduce temperature.",
            "The LLM stops predicting tokens abruptly; engineer the prompt to accommodate the shorter length.",
            "The LLM repeats itself; increase Top-K.",
            "The LLM produces factual errors; use few-shot prompting."
        ],
        answer: 1,
        explanation: "A short output length simply cuts off the generation. The prompt itself might need to be engineered to encourage conciseness if a short output is required."
    },
    {
        question: "The paper mentions the \"repetition loop bug\" where an LLM gets stuck generating the same filler words. This can be exacerbated by:",
        options: [
            "Only using zero-shot prompts.",
            "Inappropriate temperature and top-k/top-p settings (either too low or too high).",
            "Providing too many examples in few-shot prompting.",
            "Not specifying a role for the LLM."
        ],
        answer: 1,
        explanation: "The repetition loop bug can occur with overly deterministic (low temp) or excessively random (high temp) settings, as the model's sampling gets stuck."
    },
    {
        question: "Which of these is NOT listed as a \"Best Practice\" for prompt engineering in the document?",
        options: [
            "Provide examples.",
            "Design with simplicity.",
            "Always use the highest possible temperature for maximum creativity.",
            "Be specific about the output."
        ],
        answer: 2,
        explanation: "While experimenting with temperature is good, always using the highest temperature is not a general best practice, as it can lead to irrelevant or incoherent output depending on the task. The paper advises starting points and adjusting based on the task."
    },
    {
        question: "When a prompt defines the \'big picture\' of what an LLM should be doing (e.g., \'Translate the following text to French\'), what specific type of prompting is this, according to the paper?",
        options: [
            "Contextual prompting",
            "Role prompting",
            "System prompting",
            "Few-shot prompting"
        ],
        answer: 2,
        explanation: "System prompting sets the overall context and purpose for the language model, defining its fundamental task."
    },
    {
        question: "If you provide an LLM with specific details or background information relevant to the current conversation or task to help it understand nuances, what technique are you using?",
        options: [
            "Step-back prompting",
            "Contextual prompting",
            "Zero-shot prompting",
            "Top-K sampling"
        ],
        answer: 1,
        explanation: "Contextual prompting provides immediate, task-specific information to guide the LLM\'s response based on the current situation."
    },
    {
        question: "What is the core idea behind \'Step-back prompting\' as described in the document?",
        options: [
            "Assigning a very specific, narrow role to the LLM.",
            "Providing multiple incorrect examples to teach the LLM what not to do.",
            "Prompting the LLM to first consider a general question related to the specific task, then using that general answer to help with the specific task.",
            "Reducing the temperature to 0 for all prompts."
        ],
        answer: 2,
        explanation: "Step-back prompting involves abstracting to a more general concept or question first, and then using the LLM\'s answer to that to inform the approach to the original, more specific question."
    },
    {
        question: "Which of the following is highlighted as a \'Best Practice\' for prompt engineering when working with classification tasks in few-shot prompting?",
        options: [
            "Always use a temperature of 1.",
            "Only provide examples of one class.",
            "Mix up the classes in your examples.",
            "Avoid using JSON for output structure."
        ],
        answer: 2,
        explanation: "The paper advises to \'For few-shot prompting with classification tasks, mix up the classes\' to provide diverse examples."
    },
    {
        question: "The document emphasizes the importance of documenting prompt engineering work. What is a suggested method for this?",
        options: [
            "Only saving the final successful prompt.",
            "Using a structured table format to keep track of iterations, goals, model settings, and outputs.",
            "Writing a long narrative for each attempt.",
            "Relying solely on version control comments."
        ],
        answer: 1,
        explanation: "The paper suggests using a table format (as shown in its examples) to document prompts, including their name, goal, model, settings, the prompt itself, and the output, to track the iterative process."
    }
];

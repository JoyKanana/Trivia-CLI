
const questions = [
    {
        question: "What is the name for the smell of rain on dry ground?",
        answer: "petrichor"
    },
    {
        question: "Which animal has fingerprints similar to humans?",
        answer: "koala"
    },
    {
        question: "Which mammal can truly fly?",
        answer: "bat"
    },
    {
        question: "Which sea creature has three hearts?",
        answer: "octopus"
    },
    {
        question: "Which planet has a day longer than its year?",
        answer: "venus"
    },
    {
        question: "Which African country is surrounded by South Africa?",
        answer: "lesotho"
    },
    {
        question: "Which letter is missing from all US state names?",
        answer: "q"
    },
    {
        question: "Which animal can rest while standing?",
        answer: "horse"
    }
]; const validQuestions = questions.filter((item) => {
    return item.question && item.answer;
});

const readline = require("node:readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let score = 0;

async function startQuiz() {
    console.log("================================");
    console.log("       WELCOME TO TRIVIA CLI");
    console.log("================================");
    console.log("Answer each question within 15 seconds.");
    console.log("Your answers are not case-sensitive.");
    console.log("Let's begin!");

    for (const current of validQuestions) {
        console.log(`\n${current.question}`);

        const controller = new AbortController();

        const timer = setTimeout(() => {
            controller.abort();
        }, 15000);

        try {
            const answer = await rl.question("Your answer: ", {
                signal: controller.signal
            });

            clearTimeout(timer);

            if (answer.trim().toLowerCase() === current.answer) {
                console.log("Correct!");
                score++;
            } else {
                console.log(
                    `Not quite! The correct answer is ${current.answer}.`
                );
            }
        } catch (error) {
            clearTimeout(timer);

            if (error.name === "AbortError") {
                console.log(
                    `\nTime's up! The correct answer is ${current.answer}.`
                );
            } else {
                throw error;
            }
        }
    }

    console.log("\n================================");
    console.log("           QUIZ RESULTS");
    console.log("================================");
    console.log(`Your score: ${score}/${validQuestions.length}`);

    const percentage = Math.round(
        (score / validQuestions.length) * 100
    );

    console.log(`Your percentage: ${percentage}%`);

    if (percentage >= 80) {
        console.log("Excellent work!");
    } else if (percentage >= 50) {
        console.log("Good effort! Keep practising.");
    } else {
        console.log("Keep learning and try again!");
    }

    rl.close();
}

startQuiz().catch((error) => {
    console.error("Something went wrong:", error.message);
    rl.close();
});

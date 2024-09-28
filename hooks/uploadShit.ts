import { collection, doc, writeBatch } from "firebase/firestore";
import { store } from "@/hooks/useFirebase";

const questions = [
    {
        question: "Which of these foods is best for your brain health?",
        answers: {
            "1": {
                text: "Blueberries",
                img: "https://plus.unsplash.com/premium_photo-1674347951519-ba11f53502ff?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: true
            },
            "2": {
                text: "Candy",
                img: "https://images.unsplash.com/photo-1534119139482-b530a7f9a98b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: false
            }
        }
    },
    {
        question: "Which activity strengthens your heart the most?",
        answers: {
            "1": {
                text: "Running",
                img: "https://images.unsplash.com/photo-1475274110913-480c45d0e873?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: true
            },
            "2": {
                text: "Watching TV",
                img: "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: false
            }
        }
    },
    {
        question: "Which of these drinks is the healthiest?",
        answers: {
            "1": {
                text: "Water",
                img: "https://plus.unsplash.com/premium_photo-1670426502046-de1cf1d78ec5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: true
            },
            "2": {
                text: "Soda",
                img: "https://images.unsplash.com/photo-1550634487-24e377301911?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                correct: false
            }
        }
    },
    {
        question: "How many hours of sleep should teens get each night?",
        answers: {
            "1": {
                text: "8-10 hours",
                img: "https://images.unsplash.com/photo-1515894203077-9cd36032142f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DURL of someone sleeping image", // Placeholder
                correct: true
            },
            "2": {
                text: "4-6 hours",
                img: "https://plus.unsplash.com/premium_photo-1661777305735-1456c924863f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: false
            }
        }
    },
    {
        question: "Which habit helps prevent cavities the most?",
        answers: {
            "1": {
                text: "Brushing your teeth twice a day",
                img: "https://images.unsplash.com/photo-1609840113564-ab4aba4956c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: true
            },
            "2": {
                text: "Eating lots of sugary snacks",
                img: "https://images.unsplash.com/photo-1517920451045-89de176c08f0?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder
                correct: false
            }
        }
    },
    // {
    //     question: "Which of these exercises helps build muscle?",
    //     answers: {
    //         "1": {
    //             text: "Lifting weights",
    //             img: "URL of weights or someone lifting weights image", // Placeholder
    //             correct: true
    //         },
    //         "2": {
    //             text: "Playing video games",
    //             img: "URL of a video game controller image", // Placeholder
    //             correct: false
    //         }
    //     }
    // },
    // {
    //     question: "Which of these foods gives you the most energy for a busy day?",
    //     answers: {
    //         "1": {
    //             text: "Oatmeal",
    //             img: "URL of a bowl of oatmeal image", // Placeholder
    //             correct: true
    //         },
    //         "2": {
    //             text: "Ice cream",
    //             img: "URL of an ice cream cone or bowl of ice cream image", // Placeholder
    //             correct: false
    //         }
    //     }
    // },
    // {
    //     question: "What should you do to prevent dehydration during exercise?",
    //     answers: {
    //         "1": {
    //             text: "Drink water",
    //             img: "URL of a water bottle or someone drinking water image", // Placeholder
    //             correct: true
    //         },
    //         "2": {
    //             text: "Skip drinking anything",
    //             img: "URL of empty water bottle image", // Placeholder
    //             correct: false
    //         }
    //     }
    // },
    // {
    //     question: "Which of these foods is rich in Vitamin C?",
    //     answers: {
    //         "1": {
    //             text: "Oranges",
    //             img: "URL of an orange or orange slices image", // Placeholder
    //             correct: true
    //         },
    //         "2": {
    //             text: "French fries",
    //             img: "URL of a plate of French fries image", // Placeholder
    //             correct: false
    //         }
    //     }
    // },
    // {
    //     question: "What is the best way to manage stress?",
    //     answers: {
    //         "1": {
    //             text: "Talking to a friend or family member",
    //             img: "URL of two people talking or a phone call image", // Placeholder
    //             correct: true
    //         },
    //         "2": {
    //             text: "Keeping your feelings to yourself",
    //             img: "URL of a sad face or someone looking worried image", // Placeholder
    //             correct: false
    //         }
    //     }
    // }
];


export const pushQuestionsToFirestore = async () => {
    try {
        const batch = writeBatch(store);
        const collectionRef = collection(store, 'bettergayme');

        questions.forEach((questionData) => {
            const docRef = doc(collectionRef); 
            batch.set(docRef, questionData); 
        });

        await batch.commit();
        console.log(`${questions.length} questions added successfully!`);
    } catch (error: any) {
        console.error('Error adding questions:', error.message);
    }
};

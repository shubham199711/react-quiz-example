exports.ALL_QUESTIONS = [
	{
		questionId: 1,
		question: 'how are you?',
		code: `const setAnswerAndNewQuestion = (questionId, optionId) => {
    if (currentIndex < allQuestions.length) {
        setAllAnswers((prev) => [...prev, { questionId, optionId }]);
        if (currentIndex + 1 === allQuestions.length) {
            setIsDone(true);
            console.log({ ...[...allAnswers, { questionId, optionId }] });
        }
        setCurrentQuestion(allQuestions[currentIndex + 1]);
        setCurrentIndex(currentIndex + 1);
    }
};`,
		options: [
			{
				optionId: 1,
				optionText: 'me',
			},
			{
				optionId: 2,
				optionText: 'you',
			},
			{
				optionId: 3,
				optionText: 'all',
			},
		],
	},
	{
		questionId: 2,
		question: 'best data?',
		options: [
			{
				optionId: 1,
				optionText: 'not your data',
			},
			{
				optionId: 2,
				optionText: 'me data is best',
			},
		],
	},
];

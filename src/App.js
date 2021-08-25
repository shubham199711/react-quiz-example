import React, { useState, useEffect } from 'react';
import './App.css';
import { ALL_QUESTIONS } from './data/questions';

function App() {
	// eslint-disable-next-line no-unused-vars
	const [allQuestions, _] = useState(ALL_QUESTIONS);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSelected, setCurrentSelected] = useState(null);
	const [allAnswers, setAllAnswers] = useState(() =>
		ALL_QUESTIONS.map(() => ({}))
	);
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		setCurrentQuestion(allQuestions[currentIndex]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setAnswer = async (questionId, optionId) => {
		setCurrentSelected({ questionId, optionId });
	};

	const prev = () => {
		setCurrentQuestion(allQuestions[currentIndex - 1]);
		setCurrentSelected(allAnswers[currentIndex - 1]);
		setCurrentIndex(currentIndex - 1);
		setIsDone(false);
	};

	const next = async () => {
		if (currentIndex + 1 === allQuestions.length) {
			setIsDone(true);
		}
		await setAllAnswers((prev) => {
			prev[currentIndex] = currentSelected;
			return prev;
		});
		setCurrentQuestion(allQuestions[currentIndex + 1]);
		setCurrentSelected(allAnswers[currentIndex + 1]);
		setCurrentIndex(currentIndex + 1);
	};

	const skip = () => {
		if (currentIndex + 1 === allQuestions.length) {
			setIsDone(true);
		}
		setCurrentQuestion(allQuestions[currentIndex + 1]);
		setCurrentSelected(allAnswers[currentIndex + 1]);
		setCurrentIndex(currentIndex + 1);
	};

	const clear = () => {
		setAllAnswers((prev) => {
			prev[currentIndex] = {};
			return prev;
		});
		setCurrentSelected({});
	};

	const goToQuestion = (index) => {
		if (index === allQuestions.length) {
			setIsDone(true);
		}
		setCurrentQuestion(allQuestions[index]);
		setCurrentSelected(allAnswers[index]);
		setCurrentIndex(index);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div
				className='card'
				style={{
					backgroundColor: '#fff',
					marginTop: '4em',
					marginLeft: '3em',
					marginRight: '3em',
					width: '100%',
					maxWidth: '100vmin',
				}}
			>
				<div className='card'>
					<div className='container'>
						<div
							style={{
								display: 'flex',
								gap: '0.2em',
								justifyContent: 'center',
								flexWrap: 'wrap',
							}}
						>
							{allAnswers.map((item, index) => {
								return (
									<div
										className={
											item.optionId
												? 'numberCircleDone'
												: 'numberCircle'
										}
										onClick={() => goToQuestion(index)}
									>
										{index + 1}
									</div>
								);
							})}
						</div>
						<h3>{currentQuestion?.question}</h3>
						{currentQuestion?.code && (
							<pre>
								<code>{currentQuestion?.code}</code>
							</pre>
						)}
						<div>
							{currentQuestion?.options.map((item, index) => {
								return (
									<div
										key={`${currentQuestion?.questionId},${item.optionId}`}
										onClick={() =>
											setAnswer(
												currentQuestion.questionId,
												item.optionId
											)
										}
										style={{
											padding: '1em 0 1em 1em',
											cursor: 'pointer',
											margin: '5px 0',
											backgroundColor:
												currentSelected?.optionId ===
												item.optionId
													? '#008cba'
													: 'gray',
											color: 'white',
										}}
									>
										{index + 1}
										{'. '} {item.optionText}
									</div>
								);
							})}
							{!isDone && (
								<div
									style={{
										display: 'flex',
										marginTop: '1em',
										gap: '1em',
										justifyContent: 'center',
									}}
								>
									<button
										onClick={() => {
											prev();
										}}
										disabled={currentIndex === 0}
										className={
											currentIndex === 0 ? 'disabled' : ''
										}
									>
										Prev
									</button>

									<button
										style={{
											backgroundColor: '#f44336',
										}}
										onClick={() => {
											clear();
										}}
										disabled={
											currentSelected?.optionId
												? false
												: true
										}
										className={
											currentSelected?.optionId
												? ''
												: 'disabled'
										}
									>
										Clear
									</button>

									<button
										onClick={() => {
											currentSelected?.optionId
												? next()
												: skip();
										}}
										disabled={
											currentIndex === allQuestions.length
										}
									>
										{currentSelected?.optionId
											? 'Next'
											: 'Skip'}
									</button>
								</div>
							)}
							{isDone && (
								<div
									style={{
										marginBottom: '2em',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<h1>Done</h1>
									<div
										style={{
											display: 'flex',
											gap: '1em',
										}}
									>
										<button
											onClick={() => {
												prev();
											}}
											disabled={currentIndex === 0}
											className={
												currentIndex === 0
													? 'disabled'
													: ''
											}
										>
											Prev
										</button>
										<button
											style={{
												backgroundColor: '#4CAF50',
											}}
											onClick={() => {
												// eslint-disable-next-line no-restricted-globals
												confirm(
													'Do you want to submit the test?'
												);
											}}
										>
											Submit
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

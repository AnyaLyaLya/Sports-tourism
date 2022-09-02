// Всі варіанти відповідей
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3')

const optionElements = document.querySelectorAll('.option'); //Всі відповіді

const question = document.getElementById('question'); //Питання

const numberOfQuestion = document.getElementById('number-of-question'), //Номер поточного питання 
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //Кількість усіх запитань

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let indexOfQuestion = 0, //Індекс поточного питання
    indexOfPage = 0; //Індекс сторінки

let score = 0; //Результат вікторини

let completedAnswers = []; 

const correctAnswer = document.getElementById('correct-answer'), //Кількість правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //Кількість усіх відповідей для модального вікна
      btnTryAgain = document.getElementById('btn-try-again'); //Кнопка почати вікторину спочатку

const questions = [
    {
        question : 'Спортивний туризм це ... ?',
        options : [
            'Неолімпійський вид спорту з відвідування різноманітних територій з пізнавальною метою',
            'Неолімпійський вид спорту який передбачає подорожі в гірській місцевості',
            'Неолімпійський вид спорту з подолання певного відрізку земної поверхні, який називають маршрутом',
        ],
        rightAnswer : 3 
    },
    {
        question : 'Який вид спортивного туризму передбачає подолання печер?',
        options : [
            'Спелео',
            'Гірський',
            'Пішохідний',
        ],
        rightAnswer : 1
    },
    {
        question : 'В якому виді спортивного туризму використовують як засіб пересування - катамаран?',
        options : [
            'Гірському',
            'Водному',
            'Пішохідному',
        ],
        rightAnswer : 2 
    },
    {
        question : 'Основним нормативним документом, що регламентує порядок організації, проведення та підведення підсумків змагань зі спортивного туризму є :',
        options : [
            'Єдина спортивна кваліфікація України з неолімпійських видів спорту',
            'Правил проведення змагань зі спортивного туризму',
            'Регламент змагань з видів спортивного туризму',
        ],
        rightAnswer : 3 
    },
    {
        question : 'Найвищим спортивним розрядом в Україні є',
        options : [
            'Перший спортивний розряд',
            'Майстер спорту України',
            'Кандидат в майстри спорту України',
        ],
        rightAnswer : 2 
    },
    {
        question : 'Яка дистанція змагань з пішохідного туризму передбачає обов*язкове орієнтування на місцевості?',
        options : [
            'Крос-похід',
            'Смуга перешкод',
            'Рятувальні роботи',
        ],
        rightAnswer : 1 
    },
    {
        question : 'Який вид зовнішньої кровотечі найбільше загрожує життю?',
        options : [
            'Артеріальна',
            'Венозна',
            'Капілярна',
        ],
        rightAnswer : 1 
    },
    {
        question : 'Потерпілому важким предметом затисло ногу, на дотик вона холодна. Необхідно:',
        options : [
            'Робити масаж',
            'Накласти джгут',
            'Протерти ногу спиртом',
        ],
        rightAnswer : 2 
    },
    {
        question : 'Який етап учасники проходять з рукавицями та гальмівним пристроєм?',
        options : [
            'Навісну переправу',
            'Вертикальний підйом',
            'Спуск по вертикальних перилах',
        ],
        rightAnswer : 3 
    },
    {
        question : 'Яка кількість вузлів офіційно описана у "Технічному регламенті"?',
        options : [
            '16',
            '20',
            '18',
        ],
        rightAnswer : 1 
    }
]  

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    
    numberOfQuestion.innerHTML = indexOfPage + 1; //Номер поточної сторінки
    indexOfPage++;
}

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if(indexOfPage == questions.length){
        quizOver();
    }else{
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if(item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }else{
                indexOfQuestion = randomNumber;
                load();
            }
        }else if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
};

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
    
};

const enableOption = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
};

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Виберіть один із варіантів відповідей!')
    }else{
        randomQuestion();
        enableOption();
    }
};

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () =>{
    validate();
});

window.addEventListener('load', () =>{ 
    randomQuestion();
    answerTracker();
});


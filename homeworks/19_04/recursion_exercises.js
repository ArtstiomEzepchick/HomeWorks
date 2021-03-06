// Задачи по тему "Рекурсия и стек".

// ЗАДАЧА №1

// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

// Например:

// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
// Сделайте три варианта решения:

// С использованием цикла.
// Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
// С использованием формулы арифметической прогрессии.
// Пример работы вашей функции:

// function sumTo(n) { /*... ваш код ... */ }

// alert( sumTo(100) ); // 5050
// P.S. Какой вариант решения самый быстрый? Самый медленный? Почему?

// P.P.S. Можно ли при помощи рекурсии посчитать sumTo(100000)?

// ПЕРВОЕ РЕШЕНИЕ

function sumToCycleUsed(n) {
    let result = 0;

    for (let i = 0; i <= n; i++) {
        result += i;
    };

    return result;
};

console.log(sumToCycleUsed(4));

// ВТОРОЕ РЕШЕНИЕ

function sumToRecursionUsed(n) {
    if (n === 1) {
        return n;
    };

    return n + sumToRecursionUsed(n - 1);
};

console.log(sumToRecursionUsed(100));

// ТРЕТЬЕ РЕШЕНИЕ

function sumToFormula(n) {
    return n * (n + 1) / 2;
};

console.log(sumToFormula(4));

// Предполагаю, что самым медленным будет решение задачи с помощью рекурсии ввиду вложенных функций, 
// на втором месте - цикл, на третьем формула, т.к. она выглядит проще всего: нет переброра как в цикле, нет вложенных функций как в рекурсии



// ЗАДАЧА №2

// Факториал натурального числа – это число, умноженное на "себя минус один", затем на "себя минус два", и так далее до 1. 
// Факториал n обозначается как n!

// Определение факториала можно записать как:

// n! = n * (n - 1) * (n - 2) * ...*1
// Примеры значений для разных n:

// 1! = 1
// 2! = 2 * 1 = 2
// 3! = 3 * 2 * 1 = 6
// 4! = 4 * 3 * 2 * 1 = 24
// 5! = 5 * 4 * 3 * 2 * 1 = 120
// Задача – написать функцию factorial(n), которая возвращает n!, используя рекурсию.

// alert( factorial(5) ); // 120
// P.S. Подсказка: n! можно записать как n * (n-1)! Например: 3! = 3*2! = 3*2*1! = 6

function factorial(n) {
    if (n === 1) {
        return n;
    };

    return n * factorial(n - 1);
};

console.log(factorial(5));


// Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, 
// следующее число получается как сумма двух предыдущих.

// Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....

// Числа Фибоначчи тесно связаны с золотым сечением и множеством природных явлений вокруг нас.

// Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.

// Пример работы:

// function fib(n) { /* ваш код */ }

// alert(fib(3)); // 2
// alert(fib(7)); // 13
// alert(fib(77)); // 5527939700884757
// P.S. Все запуски функций из примера выше должны работать быстро. Вызов fib(77) должен занимать не более доли секунды.

// function fib(n) {
//     if (n <= 1) {
//         return n;
//     };

//     return fib(n - 1) + fib(n - 2);
// };

// console.log(fib(7));


function fib(n) {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
    };

    return b;
  };

console.log(fib(7));


// ЗАДАЧА №4

// Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):

// const list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };
// Напишите функцию printList(list), которая выводит элементы списка по одному.

// Сделайте два варианта решения: используя цикл и через рекурсию.

// Как лучше: с рекурсией или без?

// const list = {
//   value: 1,

//   next: {
//     value: 2,

//     next: {
//       value: 3,

//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };

// Первое решение

// function printList(list) {
//     while(list) { // Привык к циклу for - из-за этого еле додумался до цикла while, т.к. с for не получалось.
//         console.log(list.value);
//         list = list.next;
//     };
// };

// printList(list)

// Второе решение

// function printList(list) {
//     if (list.value) {
//         console.log(list.value);
//     };

//     if (list.next) {
//         console.log(printList(list.next));
//     };
// };

// printList(list);
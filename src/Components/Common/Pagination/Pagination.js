import React, {useState} from "react";
import cn from 'classnames';
import styles from './Pagination.module.css'
//компонент выводит страницы различного контента
let Pagination = (props) => {
//общее число страниц, округленные в большую сторону
    let pagesCount = Math.ceil(props.totalItemsCount / props.usersOnPage);
    //массив для номеров страниц
    let pages = [];
    //заполняем массив
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    //Хук для задания размера порции оторажаемых страниц. Без сеттера, т.к. пользователь не может сам задавать это число.
    //моно реализовать в будущем.
    let [portionSize] = useState(10)
    //какую порцию показываем. меняется при нажатии
    let [portionNumber, setPortionNumber] = useState(1)
    //общее количесвто порций
    let portionCount = Math.ceil(pagesCount / portionSize)
    //левая граница порции
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    //правая граница порции
    let rightPortionNumber = portionNumber * portionSize

    return <div className={styles.pagination}>
        {/*если порция не первая, то показывать кнопки "предыдущая порция" или "в начало"*/}
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(1)
        }}>&lArr;</button>}
        {portionNumber > 1 && <button onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>&larr;</button>}
{/*отфильровать все порции не входящие в промежуток левой и правой границ*/}
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
            //отобразить оставшиеся порции
            .map(p => {
                return <span
                    className={cn({[styles.selectedPage]: props.currentPage === p}, styles.pageNumber)}
                    key={p}
                    onClick={() => {
                        //при нажатии меняем порцию и текущую страницу
                        props.onPageChanged(p)
                        props.setCurrentPage(p)
                    }}
                >{p}</span>
            })
        }
        {/*если порция не последняя, то показывать кнопки "следующая порция" или "в конец"*/}
        {portionCount > portionNumber && <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>&rarr;</button>}
        {portionCount > portionNumber &&
        <button onClick={() => {
            setPortionNumber(portionCount)
        }}>&rArr;
        </button>}
    </div>
}

export default Pagination;

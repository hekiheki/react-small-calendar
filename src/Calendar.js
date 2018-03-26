import React,{Component} from 'react';
import PropTypes from 'prop-types'

import './calendar.css';
import {dateFormat,getDateList,convertDyadicArray} from './units';

// 显示年月
const CalendarHead = (props) => {
    const monthList = {
        "en": ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        "zh": ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    };
    const lang = props.lang;
    const month = monthList[lang][props.month-1];
    const year = props.year;
    const text = lang === "en" ? year+' '+month : year+'年'+month;
    return <div className="calendar-head">
            <span onClick={props.handlePrev} className="prevMonth">《</span>
            <span className="calendar-head-text">{text}</span>
            <span onClick={props.handleNext} className="nextMonth">》</span>
        </div>
}
// 生成星期列表
const Weekdays = (props) => {
    const lang = props.lang;
    const weekdays = {
        "en": ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        "zh": ['日','一','二','三','四','五','六']
    }
    return <div className="calendar-weekdays">{weekdays[lang].map((item) => <span key={item}>{item}</span>)}</div>
}
// 生成日期列表
const DateTable = (props) => {
    const { year, month, handleSelect,selectDate,formdata} = props;
    const dateListArray = getDateList(year,month);
    const dateList = convertDyadicArray(dateListArray,7);
 
    return (
        <div className="calendar-dateList">
            {
                dateList.map((row,i) => 
                    <div className="calendar-row" key={i}>{
                        row.map((item,i) => <div key={i} 
                                                className={item ? "calendar-date" : ""}   
                                            >
                                                <span 
                                                    className={dateFormat(new Date(year,month-1,item),formdata) === selectDate ? 'calendar-date-on' : ""}
                                                    onClick={handleSelect}
                                                    data-date={item}
                                                >{item}</span>
                                            </div>)
                    }</div>
                )
            }
        </div>
    )
        
}

const CalendarBody = (props) => {
    const { lang, year, month, handleSelect,selectDate, formdata} = props;

    return (
        <div>
            <Weekdays lang={lang} />
            <DateTable year={year} 
                        month={month} 
                        selectDate={selectDate}
                        handleSelect={handleSelect} 
                        formdata={formdata}
            />
        </div>
    )
}

class Calendar extends Component {
    constructor(props) {
        super(props);
    
        const _date = new Date();
        const year = _date.getFullYear();
        const month = _date.getMonth()+1;
        const formdata = this.props.formdata;
        this.state = {
            year: year,
            month: month,
            selectDate: dateFormat(_date,formdata),
        }  
    }
    handlePrevMonth(){
        this.setState({
            month: this.state.month>1 ? this.state.month-1 : 12,
            year: this.state.month>1 ? this.state.year : this.state.year-1
        })
    }
    handleNextMonth(){
        this.setState({
            month: this.state.month<12 ? this.state.month+1 : 1,
            year: this.state.month<12 ? this.state.year : this.state.year+1
        })
    }
    handleSelectDate(e){
        const activeDate = e.target.getAttribute('data-date');
        if(activeDate){
            const date = new Date(this.state.year,this.state.month-1,activeDate);
            this.setState({
                selectDate:dateFormat(date,this.props.formdata)
             })
             this.props.onSelect(dateFormat(date,this.props.formdata));
        }
    }
    render(){
        const { year, month,selectDate } = this.state;
        const { lang, formdata } = this.props;
        const headOptions = {
            lang: lang,
            year: year,
            month: month,
            handlePrev: this.handlePrevMonth.bind(this),
            handleNext: this.handleNextMonth.bind(this)
        }
        const bodyOptions = {
            lang: lang,
            year: year,
            month: month,
            selectDate: selectDate,
            formdata: formdata,
            handleSelect: this.handleSelectDate.bind(this)
        }
        return (
            <div className="calendar-box">
                <CalendarHead {...headOptions} />
                <CalendarBody {...bodyOptions} />
            </div>
        )
    }
}

Calendar.propTypes = {
    onSelect: PropTypes.func,
    lang: PropTypes.string,
    formdata: PropTypes.string,
}
Calendar.defaultProps = {
    onSelect() {},
    lang: 'zh',
    formdata: 'yyyy-MM-dd',
}
export default Calendar;
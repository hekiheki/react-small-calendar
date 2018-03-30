# react-small-calendar


## API

<table>
        <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
        </tr>
        <tr>
            <td>formdate</td>
            <td>设置返回日期格式</td>
            <td>string</td>
            <td>'yyyy-MM-dd'</td>
        </tr>
        <tr>
            <td>lang</td>
            <td>设置语言,'en','zh'</td>
            <td>string</td>
            <td>'zh'</td>
        </tr>
        <tr>
            <td>onSelect</td>
            <td>返回选择的日期值</td>
            <td>function(value)</td>
            <td>无</td>
        </tr>
</table>

## 如何使用

* 安装

```
	npm install react-small-calendar
```

* 使用

```
	import Calendar form 'react-small-calendar'

	render(){
		return (
			<div className="App">
        		<input value={this.state.value}  />
        		<Calendar
        		 	onSelect = {() => {}}
        		 	formdata = "yyyy/MM/dd"
        		 	lang = "en"
        		/>
      		</div>
      )
	}
```



# sort_with_criterions
The module for sorting an array with objects. Sorting possible on several keys, taking their importance.

<details>
  <summary>Russian language</summary>
Модуль предназначен для сортировки массива с объектами. Сортировка происходит по нескольким ключам с учетом их важности.
Пример. Каждый продукт в магазине представлен в виде объекта и имеет такие свойства как имя, цена, стоимость доставки и количество на складе (“name”, “price”, “delivery_price”, “stock”). 
Цена, стоимость доставки и количество на складе – это свойства, влияющие на последовательность продуктов в массиве, то есть «критерии» сортировки.
Критерии имеют приоритеты. В этом примере, цена является главным свойством продукта (первый приоритет), поэтому сначала продукты будут отсортированы по цене. Те продукты, которые имеют одинаковое значение цены будут отсортированы между собой по цене доставки (второй приоритет). Если в массиве содержаться продукты с одинаковой ценой и стоимостью доставки, они будут отсортированы между собой по количеству на складе (третий приоритет).

При этом количество критериев сортировки задается динамически.         

Массив с объектами которые нужно отсортировать: 
```js
let arr_data = [{'name': 'product1', 'price':110, 'delivery_price':4, 'stock':10}, 
		{'name': 'product2', 'price':99, 'delivery_price':11, 'stock':8},
		{'name': 'product3', 'price':110, 'delivery_price':6, 'stock':8}, 
		{'name': 'product4', 'price':110, 'delivery_price':6, 'stock':5}];
```
Ниже представлен массив с условиями сортировки. Каждое условие это отдельный объект с ключами 'key' и 'sort'. 'key' - это ключ массива по значениям которого должна
быть сортировка. 'sort' - это тип сортировки, может быть 'biggest_in_first' или 'least_in_first' (соответственно от большего к меньшему или от меньшего к большему).
Последовательность объектов в массиве соответствуют приоритетам сортировки.
```js
let arr_criterions = [{'key':'price', 'sort':'least_in_first'},
		      {'key':'delivery_price', 'sort':'least_in_first'},
		      {'key':'stock', 'sort':'biggest_in_first'}]
```
Вызов функции будет выглядеть так: 
```js
const { sort_with_criterions } = require('./sort_with_criterions.js')
let arr_sorted = sort_with_criterions(arr_data, arr_criterions);
 ```

Отсортированный массив:
 ```js
[{'name': 'product2', 'price':99, 'delivery_price':11, 'stock':8},
{'name': 'product1', 'price':110, 'delivery_price':4, 'stock':10},
{'name': 'product3', 'price':110, 'delivery_price':6, 'stock':8}, 
{'name': 'product4', 'price':110, 'delivery_price':6, 'stock':5}]
```

В случае успешной проверки входных данных и сортировки функция вернет: {'data': [отсортированные объекты], 'err': ''}.
В случае ошибки входных данных: {'data': [], 'err': текст ошибки}.

Условия входных данных:
- должно быть как минимум одно условие сортировки;
- каждый объект сортировка должен иметь все критерии, по которым происходит сортировка;

Сортировка может быть:
  - по числовым значениям (0.14, 1, 3.14); 
  - по числовым значениям в формате строки ('0.14', '1', '3.14');
  - смешенная числовая('0.11', 0.14, 1, '5', 3.14);
  - буквенная - алфавитная ('cat','dog', 'rat');
  - смещенная буквенно числовая ('5', 'cat','dog', 0.11, 4)\*;  
  \*-первыми в массиве всегда будут строки.
</details>

Example. Each product in the store is represented as an object and has properties such as name, price, shipping cost, and quantity in stock (“name”, “price”, “delivery_price”, “stock”).
Price, shipping cost, and quantity in stock are properties that affect the sequence of products in the array, i.e. sorting "criterias".
Criteria have priority. In this example, price is the main property of the product (first priority), so the products will be sorted by price first. Those products that have the same price value will be sorted among themselves by shipping price (second priority). If the array contains products with the same price and shipping cost, this products will be sorted among themselves by the quantity in stock (third priority).

The number of sorting criteria has a dynamic value.
  
An array with objects to sort:
```js
let arr_data = [{'name': 'product1', 'price':110, 'delivery_price':4, 'stock':10}, 
		{'name': 'product2', 'price':99, 'delivery_price':11, 'stock':8},
		{'name': 'product3', 'price':110, 'delivery_price':6, 'stock':8}, 
		{'name': 'product4', 'price':110, 'delivery_price':6, 'stock':5}];
```
"arr_criterions" is what an array looks like with sort conditions. Each condition is an object with keys 'key' and 'sort'. 'key' is the key of the array by which values the sort should be. 'sort' is the sort type, can be 'biggest_in_first' or 'least_in_first' (largest to smallest or smallest to largest respectively) The order of the objects in the array corresponds to the sort priorities.
```js
let arr_criterions = [{'key':'price', 'sort':'least_in_first'},
		      {'key':'delivery_price', 'sort':'least_in_first'},
		      {'key':'stock', 'sort':'biggest_in_first'}]
```
The function call will look like this:
```js
const { sort_with_criterions } = require('./sort_with_criterions.js')
let arr_sorted = sort_with_criterions(arr_data, arr_criterions);
 ```
 Sorted array:
 ```js
[{'name': 'product2', 'price':99, 'delivery_price':11, 'stock':8},
{'name': 'product1', 'price':110, 'delivery_price':4, 'stock':10},
{'name': 'product3', 'price':110, 'delivery_price':6, 'stock':8}, 
{'name': 'product4', 'price':110, 'delivery_price':6, 'stock':5}]
```
In case of successful validation of the input data and sorting, the function will return: {'data': [sorted objects], 'err': ''}.
In case of input data error: {'data': [], 'err': error text}.

Input conditions:
- must be at least one sorting condition;
- each sorting object must have all the criteria by which sorting;

Sorting can be:
  - by numerical values (0.14, 1, 3.14);
  - by numeric values in string format ('0.14', '1', '3.14');
  - mixed numeric('0.11', 0.14, 1, '5', 3.14);
  - alphabetic ('cat','dog', 'rat');
  - shifted alphanumeric ('5', 'cat','dog', 0.11, 4)\*;
  \*-First in the array will always be strings.

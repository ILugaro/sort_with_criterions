/*Check and sort data.
Input data: 
    arr_data: arrey with products, where ever product is object with any content. Exemple: [{'name': 'some_product', 'price': 112,...},...]
    arr_criterions: arrey with creterions for sort in the right priority, where ever criterion is object with keys 'key' and 'sort'. Exemple: [{'key': 'price', 'sort': 'biggest_in_first'},...]
    key 'sort' can be only 'biggest_in_first' or 'least_in_first'
Return data:
    Object with keys 'data' and 'err'(string)
    data: It's input arrey sorted based on priorities
    If not error: err = '', in enother case - "err" has text error and "data" has empty array
Exemple 1:
    {'data': [{'name': 'some_product', 'price': 112,...},...], 'err': ''}
Exemple 2:
    {'data': [], 'err': 'Don't all products have parameter "price".'}*/
function sort_with_criterions(arr_data, arr_criterions){
    const err = check_data(arr_data, arr_criterions);
    if (err) return  {'data':[], 'err':err}
    return {'data': separate_sort(arr_data, arr_criterions), 'err':''};
}

/*Input data: 
    arr_data: arrey with products, where ever product is object with any content. Exemple: [{'name': 'some_product', 'price': 112,...},...]
    prioritet: string parametr which will be sorted
    sort: string which can be only 'biggest_in_first' or 'least_in_first'
Output data: Input arrey after sort.*/
function simple_sort(arr_data, prioritet, sort){
    if (sort == 'biggest_in_first'){
        arr_data.sort((a, b) => a[prioritet] < b[prioritet] ? 1 : -1);
      }
    if (sort == 'least_in_first'){
        arr_data.sort((a, b) => a[prioritet] > b[prioritet] ? 1 : -1);
      }
    return arr_data;
}

/*Sort products on first criterion, if part of products have equal first criterion - do self closure with this part and next criterions. 
Input data: 
    arr_data: arrey with products, where ever product is object with any content. Exemple: [{'name': 'some_product', 'price': 112,...},...]
    arr_criterions: arrey with creterions for sort in the right priority, where ever criterion is object with keys 'key' and 'sort'*. Exemple: [{'key': 'price', 'sort': 'biggest_in_first'},...]
        * - key 'sort' can be only 'biggest_in_first' or 'least_in_first'
Output data:
    When all data sorted or criterions is end - return sorted array.*/
function separate_sort(arr_data, arr_criterions){
    if (arr_data.length < 2) return  arr_data;
    arr_data = simple_sort(arr_data, arr_criterions[0].key, arr_criterions[0].sort);
    if (arr_criterions.length === 1) return  arr_data; 
    let new_sorted_arr = []; //return resault
    let temp_arr = []; //array with products that have equal arr_criterions[0] and need to sort on oter criteeions  
    let i = 0;
    let equal_value = null;
    while (i<arr_data.length-1){
        if (arr_data[i][arr_criterions[0].key] != arr_data[i+1][arr_criterions[0].key]){
            //this product dont need sort more
            new_sorted_arr.push(arr_data[i])
            i++;
        }
        else{
            //this product need sort more
            temp_arr.push(arr_data[i]);
            equal_value = arr_data[i][arr_criterions[0].key];
            i++;
            //and need sort all products that have equal arr_criterions[0].key 
            while (i<arr_data.length){
                if (arr_data[i][arr_criterions[0].key] == equal_value) {
                    temp_arr.push(arr_data[i]); 
                    i++;
                }
                else {
                    new_sorted_arr = new_sorted_arr.concat(separate_sort(temp_arr, arr_criterions.slice(1)));
                    temp_arr = [];
                    break
                }
            }
        }
    } 
    if (temp_arr.length > 0) {
        new_sorted_arr = new_sorted_arr.concat(separate_sort(temp_arr, arr_criterions.slice(1)));
    }
    if (arr_data.length != new_sorted_arr.length) new_sorted_arr.push(arr_data[arr_data.length-1]); //if last product has unique value
    return new_sorted_arr
}

/*check of correct input user data
Input data: 
    arr_data: arrey with products, where ever product is object with any content. Exemple: [{'name': 'some_product', 'price': 112,...},...]
    arr_criterions: arrey with creterions for sort in the right priority, where ever criterion is object with keys 'key' and 'sort'. Exemple: [{'key': 'price', 'sort': 'biggest_in_first'},...]
    key 'sort' can be only 'biggest_in_first' or 'least_in_first'
Output data:
    sting with error text or '' if not error.*/
function check_data(arr_data, arr_criterions){
    if (!(Array.isArray(arr_data) && Array.isArray(arr_criterions))) return 'Input data and criterions must be arrays.'
    for (const obj_product of arr_data){
        {if (!(Object.prototype.toString.call(obj_product) == '[object Object]')){
            return 'In array with data(arr_data) must be only objects'
        }}
    }
    if (arr_criterions.length == 0) return 'Need one or more criterions for sort.' 
    for (const criterion of arr_criterions){
        if (!(Object.prototype.toString.call(criterion) == '[object Object]')){
            return 'Array of criterions must has object(s)'
        }
        if (!('key' in criterion && 'sort' in criterion)){
            return 'Every criterion must have "key" and "sort"'
        }
        if (!(typeof(criterion.key) === 'string')) return '"key" in criterion must be string.'
        if (!(criterion.sort === 'biggest_in_first' || criterion.sort === 'least_in_first')) return '"sort" in criterion must be only "biggest_in_first" or "least_in_first"';
        for (const obj_product of arr_data){
            if (!(criterion.key in obj_product)) return `Don't all products have parameter "${criterion.key}".`
        }
    }
    return ''
}

module.exports ={sort_with_criterions}

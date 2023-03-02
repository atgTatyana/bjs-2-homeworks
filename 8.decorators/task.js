//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];
  const maxCacheValuesCount = 5;
  return (...args) => {
    const hash = md5(args);
      
    for (let element of cache) {
      if (element[0] === hash) {
        console.log('Из кэша: ' + element[1]);
        return 'Из кэша: ' + element[1];
      }
    }
    
    const result = func(...args);
    if (cache.length < maxCacheValuesCount - 1) {
      cache.push([hash, result]);
      console.log(cache);
    } else {
      cache.shift();
      cache.push([hash, result]);
    }
    
    console.log('Вычисляем: ' + result);
    return 'Вычисляем: ' + result;
  };
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  wrapper.count = 0;
  wrapper.allCount = 0;
  
  function wrapper(...args) {
    wrapper.allCount += 1;
    if (timeoutId) {
      clearTimeout(timeoutId);
    } else {
      // функция вызывается синхронно только первый раз (один раз)
      func(...args);
      wrapper.count += 1;
    }
        
    timeoutId = setTimeout(() => {
      // функция вызывается асинхронно 1 раз после последнего вызова
      func(...args);
      wrapper.count += 1;
    }, delay); 
  }
  
  return wrapper;
}

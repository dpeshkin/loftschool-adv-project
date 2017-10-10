var highlighter = (function () {
    const articles = document.querySelectorAll('.blog__article');
    let article = {};
    let i = 0;

    const scrollSpy = function () {
        window.addEventListener('scroll', function () {
            [].forEach.call(articles, function (e) {
                article[e.id] = {
                    height: e.offsetHeight, // по идее это свойство надо закешировать, но не знаю как???
                    position: e.getBoundingClientRect().top,
                };
            });
            for (i in article) {
                if (article[i].position <= 30 && article[i].position >= -article[i].height){
                    if(document.querySelector('.nav__link_blog-active'))
                        document.querySelector('.nav__link_blog-active').classList.remove('nav__link_blog-active');
                    document.querySelector('a[href*=' + i + ']').classList.add('nav__link_blog-active'); // не подсвечивается последняя ссылка, что логично, но надо это поправить
                } 
            }
        });
    };
    return {
        scroll: scrollSpy,
    };
})();

module.exports = highlighter.scroll; // метод или функцию надо экспортировать без скобок

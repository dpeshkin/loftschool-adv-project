var highlighter = (function () {
    const articles = document.querySelectorAll('.blog__article');
    let article = {};
    let i = 0;

    const scrollSpy = function () {
        window.addEventListener('scroll', function () {
            [].forEach.call(articles, function (e) {
                article[e.id] = { // индекс элемента в массиве = его id
                    position: e.getBoundingClientRect(),
                };
            });
            const highLightNavItem = () => {
                if(document.querySelector('.nav__link_blog-active')){
                    document.querySelector('.nav__link_blog-active').classList.remove('nav__link_blog-active');
                }
                document.querySelector('a[href*=' + i + ']').classList.add('nav__link_blog-active');
            };
            for (i in article) {
                if (article[i].position.top <= window.innerHeight*0.2){
                    highLightNavItem();
                }
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight-10){  // подсветка последней статьи
                    i = Object.keys(article)[Object.keys(article).length - 1];
                    highLightNavItem();
                }
            }
        });
    };
    return {
        scroll: scrollSpy,
    };
})();

module.exports = highlighter.scroll; 

const slider = () => {
    const slider = document.querySelector('.slider');
    const controls = document.querySelectorAll('.controls');
    const projectList = slider.querySelectorAll('.project__item');
    const sliderLength = projectList.length;
    const imageList = slider.querySelectorAll('.image__item');
    const controlPrev = slider.querySelector('.controls__prev');
    const controlNext = slider.querySelector('.controls__next');
    let currentIndex = 0;
    const last = sliderLength - 1;
    
    const removeActive = (array) => {
        [].forEach.call(array, (item)=>{
            item.classList.remove('active');
        });
    };

    const makeActive = (array, index) => {
        array[index].classList.add('active');
    };

    const defineDirection = (index) => {
        let next = index + 1;
        let prev = index - 1;
        if (next > last) next = 0;
        if (prev === -1) prev = last;
        return{
            next: next,
            prev: prev,
        };
    };

    const moveItems = (index) => {
        let direction = defineDirection(index);
        removeActive(projectList);
        removeActive(imageList);
        makeActive(projectList, index);
        makeActive(imageList, index);
        controlPrev.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.prev)+'%)';
        controlNext.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.next)+'%)';
    };
    
    

    [].forEach.call(controls, (item) => {
        window.onload = () => {
            moveItems(currentIndex);
        };
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const button = e.currentTarget;
            let currentActive;
            projectList.forEach((item, index) => {
                if(item.classList.contains('active')) {currentActive = index;}
            });
            let direction = defineDirection(currentActive);
            if(button.classList.contains('controls__prev')){
                moveItems(direction.prev);
            } else {
                moveItems(direction.next);
            }
        });   
    });

};

const sliderInit = () => {
    if(document.querySelector('.slider'))
        slider();
};
module.exports = sliderInit;
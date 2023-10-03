const hamburgerBtn = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.btn__close');
const sidebar = document.querySelector('.sidebar');
const sidebarNav = document.querySelectorAll('.sidebar__link');
const headerTitle = document.querySelector('.header__title');


const sidebarNavText = () =>
{
    
}

const sidebarNavClose = () =>
{
    sidebarNav.forEach(element => {

        element.addEventListener('click', () =>
        {
            sidebar.classList.remove('sidebar__open');

            const sidebarNavP = element.querySelector('p');
       
            if(sidebarNavP.textContent.includes('Overview'))
            {
                console.log(element.textContent);
                headerTitle.textContent = 'Overview';
            }
            if(sidebarNavP.textContent.includes('Plans'))
            {
                headerTitle.textContent = 'Plans';
            }
            if(sidebarNavP.textContent.includes('Ideas'))
            {
                headerTitle.textContent = 'Ideas';
            }
            if(sidebarNavP.textContent.includes('Trends'))
            {
                headerTitle.textContent = 'Trends';
            }
            if(sidebarNavP.textContent.includes('Contacts'))
            {
                headerTitle.textContent = 'Contacts';
            }
            if(sidebarNavP.textContent.includes('Contacts'))
            {
                headerTitle.textContent = 'Contacts';
            }
            if(sidebarNavP.textContent.includes('Articles'))
            {
                headerTitle.textContent = 'Articles';
            }
        })
    });
}
sidebarNavClose();

hamburgerBtn.addEventListener('click', ()=>
{
    sidebar.classList.add('sidebar__open');
});

closeBtn.addEventListener('click', () =>
{
    sidebar.classList.remove('sidebar__open');
});

function toggleSidebar(isOpen) {
  const sidebar = document.querySelector("#Mobile-menu");
  const backdrop = document.querySelector("#Mobile-menu-blur");
  
  if (isOpen) {
    // Add tailwind classes to easily show and hide
    sidebar.classList.remove('translate-x-full');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  } else {
    sidebar.classList.add('translate-x-full');
    backdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

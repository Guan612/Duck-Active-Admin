<template>
  <div class="about">
    <h1 class="text-3xl text-amber-500">This is an about page</h1>
    <button popovertarget="cally-popover1" class="input input-border" id="cally1" style="anchor-name:--cally1">
      Pick a date
    </button>
    <div popover id="cally-popover1" class="dropdown bg-base-100 rounded-box shadow-lg"
      style="position-anchor:--cally1">
      <calendar-date class="cally">
        <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
        </svg>
        <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

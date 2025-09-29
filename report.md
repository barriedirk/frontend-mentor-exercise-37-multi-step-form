Issuee


Form elements should have a visible label

<input _ngcontent-ng-c1123082995="" type="text" name="ng.form0.email" data-cy="step-form-email" plac ...

warning
Form Controls
AI Detected2 occurrences

Input fields for Email Address and Phone Number have labels without 'for' attributes linking them to their inputs. This causes screen reader users to miss the association between label and input, making form completion confusing.

<label _ngcontent-ng-c1123082995="">Email Address</label><input _ngcontent-ng-c1123082995="" type="text" name="ng.form0.email" data-cy="step-form-email" placeholder="e.g. stephenking@lorem.com" inputmode="email" aria-required="true" aria-invalid="true" required="" aria-describedby="email-error">

Strengths
5

    Form Controls

    The 'Name' input field has a properly linked label using 'for' and 'id' attributes, ensuring clear association for screen reader users.
    Screen Reader Support

    Use of 'aria-live="polite"' on the form container helps announce dynamic changes politely to assistive technologies.
    Structure & Semantics

    The form uses a clear heading structure with an 'h2' for the form title and a descriptive paragraph, aiding users in understanding the form context.
    Navigation & Interaction

    The current step in the multi-step form is marked with 'aria-current="step"', helping screen reader users identify their progress.
    Landmarks

    The form region is wrapped in a section with 'role="group"' and 'aria-labelledby' referencing the form title, providing a meaningful landmark for assistive technologies.



Error 

error
Form Controls
2 occurrences
Read more

Form elements should have a visible label

<input _ngcontent-ng-c1123082995="" type="text" name="ng.form0.email" data-cy="step-form-email" plac ...


HTML Report

AI Analysis Summary

You've demonstrated strong semantic structure using meaningful elements and clear heading hierarchy! To take it further, consider removing duplicate meta and link tags and use a submit button for form submission to improve functionality and maintainability.
Priority recommendations:

    1

    Remove duplicate <meta name="viewport"> and <link rel="icon"> tags to avoid redundancy and potential conflicts.
    2

    Replace the <button type="button"> inside the form with <button type="submit"> to enable proper form submission behavior.
    3

    Ensure visible headings accompany visually hidden ones to support all users in understanding page structure.
    4

    Consider consolidating multiple <link rel="me"> tags or rely on structured data for social profiles to simplify markup.


error
Accessibility
5 occurrences
Read more

"aria-label" cannot be used on this element

<div _ngcontent-ng-c1897579763="" aria-label="Form progress" class="msf__steps flex flex-col items-c ...

error
Best Practice
1 occurrence
Read more

Prefer to use the native <section> element

<div _ngcontent-ng-c1897579763="" role="region" data-cy="step-body" class="msf__form relative bg-whi ...

error
Accessibility
1 occurrence
Read more
<form> element must have a submit button

<form _ngcontent-ng-c1123082995="" data-cy="step-form" class="mf__form mt-8 flex flex-col gap-4"><di ...

warning
Structure & Semantics
AI Detected1 occurrence

Duplicate <meta name="viewport"> tags which can cause inconsistent viewport settings. This may confuse browsers and affect responsive behavior for users.

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">

<base href="/frontend-mentor-exercise-37-multi-step-form/">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">

warning
Structure & Semantics
AI Detected1 occurrence

Multiple <link rel="icon"> tags with the same attributes which is redundant. This can cause unnecessary HTTP requests and slight performance degradation.

<link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">

<base href="/frontend-mentor-exercise-37-multi-step-form/">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">

warning
Structure & Semantics
AI Detected1 occurrence

Using multiple <link rel="me"> tags for social profiles is semantically correct but could be simplified by consolidating or using a single structured data block. This improves maintainability and clarity.

<link rel="me" href="https://www.linkedin.com/in/barriefreyre/">
<link rel="me" href="https://github.com/barriedirk">
<link rel="me" href="https://www.frontendmentor.io/profile/barriedirk">

warning
Structure & Semantics
AI Detected1 occurrence

The main heading <h1> is visually hidden with sr-only class but is correctly used to label the form. This is good for screen readers but ensure visible headings are also present for sighted users to understand page structure.

<h1 _ngcontent-ng-c1897579763="" id="multiStepForm" data-cy="title" class="sr-only">Multi-step form</h1>

warning
Structure & Semantics
AI Detected1 occurrence

The form uses a <button type="button"> for 'Next Step' instead of a submit button. This means the form cannot be submitted by default which may confuse users and break expected form behavior.

<button _ngcontent-ng-c1123082995="" type="button" data-cy="step-button-next-step" class="primary" disabled=""> Next Step </button>


CSS Report

You've demonstrated strong use of CSS variables, modern layout techniques, and accessibility features like focus-visible styles. To take it further, consider replacing fixed positioning with more flexible layouts and using CSS functions like calc() and clamp() for responsive sizing. Also, switching from absolute units to relative units will improve accessibility for users who resize content.
Priority recommendations:

    1

    Replace position: fixed with sticky or flexbox/grid layouts where possible to avoid content being cut off when zoomed.
    2

    Use CSS functions like calc(), min(), and clamp() to create fluid and adaptable layouts that respond better to different screen sizes.
    3

    Switch from absolute units (px) to relative units (em, rem) to support user scaling and improve accessibility.
    4

    Leverage CSS custom properties more broadly to centralize repeated values and simplify theme management.
    5

    Avoid using !important to maintain the natural cascade and make future style changes easier.


warning
Accessibility
6 occurrences
Read more

Avoid position: fixed as it can cause content to be cut off when zoomed, creating accessibility issues for users who need to enlarge content.

position: fixed;

project/src/app/features/multi-step-form/components/form/form.scss:4
warning
Accessibility
2 occurrences
Read more

Provide alternatives for users who prefer reduced motion to prevent motion sickness and other accessibility issues.

transition: 0.4s;

project/src/app/features/multi-step-form/components/form/form.scss:178
warning
Responsive Design
59 occurrences
Read more

Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.

min-height: 72px;

project/src/app/features/multi-step-form/components/form/form.scss:8
warning
Best Practice
1 occurrence
Read more

Order selectors from least to most specific to prevent unexpected style overrides.

.checkbox-switch .slider {
  background-color: var(--bg-chk-switch);
  cursor: pointer;

project/src/app/features/multi-step-form/components/form/form.scss:173
warning
Maintainability
2 occurrences
Read more

Consolidate duplicate selectors to maintain an organized and efficient stylesheet.

.checkbox-switch .slider {
  background-color: var(--bg-chk-switch);
  cursor: pointer;

project/src/app/features/multi-step-form/components/form/form.scss:173
warning
Specificity & Cascade
7 occurrences
Read more

Keep selector specificity low to maintain a flat hierarchy that is easier to maintain and override when needed.

input.add-on__checkbox:checked + .add-on__wrapper,
input.card__radio:checked + .card__wrapper {
  ba ...

project/src/app/features/multi-step-form/components/form/form.scss:114
warning
Specificity & Cascade
6 occurrences
Read more

Avoid !important as it breaks the natural cascade and makes future style changes more difficult to implement.

animation-duration: 0.01ms !important;

project/src/sass/base/_reset.scss:68
warning
Best Practice
2 occurrences
Read more

Remove duplicate properties to improve code maintainability and prevent unexpected styling behavior.

padding: 1rem;

project/src/sass/helpers/utils.css:24
info
Best Practice
4 occurrences
Read more

Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.

margin-top: auto;

project/src/app/features/multi-step-form/components/form/form.scss:27
info
Best Practice
16 occurrences
Read more

Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.

padding: 17px;

project/src/app/features/multi-step-form/components/form/form.scss:45
info
Best Practice
5 occurrences
Read more

Use CSS custom properties (variables) to centralize values, improve consistency, and make site-wide changes easier to implement.

box-shadow: 0px 25px 40px -20px rgba(0, 0, 0, 0.0951);

project/src/app/features/multi-step-form/multi-step-form.scss:21


JAVASCRIPT

AI Analysis Summary

You've demonstrated excellent accessibility support and thorough testing practices! Your use of Angular signals shows modern reactive patterns. To take it further, fix the incorrect className attributes in Angular templates to ensure styles apply correctly and consider improving subscription management in the router event logger to prevent potential memory leaks.
Priority recommendations:

    1

    Replace all className attributes in Angular templates with class to ensure styles are applied correctly.
    2

    Consider using Angular's takeUntil operator or AsyncPipe for router event subscriptions to manage unsubscription more declaratively and avoid memory leaks.
    3

    Review and test keyboard navigation handlers regularly to maintain accessibility as the UI evolves.



JAVASCRIPT

error
Syntax & Validation
AI Detected2 occurrences

Uses className attribute in Angular template which is incorrect. Angular templates require class attribute. This causes styles not to be applied, impacting UI appearance.

      <a
        className="m-0.5 "
        href="https://www.frontendmentor.io/profile/barriedirk/solutions"
        target="_blank"
        rel="noopener"
        aria-label="View solutions by Barrie Freyre on Frontend Mentor"
      >

project/src/app/layouts/main-layout/components/footer/footer.ts:7
warning
Best Practice
AI Detected1 occurrence

Subscription to router events is properly unsubscribed in ngOnDestroy, which is good. However, using inject for Router and manual subscription can be improved by using takeUntil or AsyncPipe in templates for better memory management. This helps prevent memory leaks in larger apps.

  constructor() {
    this.sub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('🔄 Navigation started:', event.url);
      } else if (event instanceof NavigationEnd) {
        console.log('✅ Navigation ended:', event.urlAfterRedirects);

project/src/app/shared/components/route-debugger-component.ts:10
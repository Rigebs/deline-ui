import { Routes } from '@angular/router';
import { DocsLayout } from './shared/layouts/docs-layout/docs-layout';
import { Introduction } from './features/introduction/introduction';
import { ButtonDoc } from './features/components-docs/button-doc/button-doc';
import { InputDoc } from './features/components-docs/input-doc/input-doc';
import { CardDoc } from './features/components-docs/card-doc/card-doc';
import { ToggleDoc } from './features/components-docs/toggle-doc/toggle-doc';

export const routes: Routes = [
  {
    path: '',
    component: DocsLayout,
    children: [
      { path: '', component: Introduction },
      { path: 'components/button', component: ButtonDoc },
      { path: 'components/input', component: InputDoc },
      { path: 'components/card', component: CardDoc },
      { path: 'components/toggle', component: ToggleDoc },
      { path: 'components/modal', loadComponent: () => import('./features/components-docs/modal-doc/modal-doc').then(c => c.ModalDoc) },
      { path: 'components/badge', loadComponent: () => import('./features/components-docs/badge-doc/badge-doc').then(c => c.BadgeDoc) },
      { path: 'components/avatar', loadComponent: () => import('./features/components-docs/avatar-doc/avatar-doc').then(c => c.AvatarDoc) },
      { path: 'components/skeleton', loadComponent: () => import('./features/components-docs/skeleton-doc/skeleton-doc').then(c => c.SkeletonDoc) },
      { path: 'components/pagination', loadComponent: () => import('./features/components-docs/pagination-doc/pagination-doc').then(c => c.PaginationDoc) },
      { path: 'components/toast', loadComponent: () => import('./features/components-docs/toast-doc/toast-doc').then(c => c.ToastDoc) },
      { path: 'components/select', loadComponent: () => import('./features/components-docs/select-doc/select-doc').then(c => c.SelectDoc) },
      { path: 'components/tabs', loadComponent: () => import('./features/components-docs/tabs-doc/tabs-doc').then(c => c.TabsDoc) },
      { path: 'components/table', loadComponent: () => import('./features/components-docs/table-doc/table-doc').then(c => c.TableDoc) },
      { path: 'components/empty-state', loadComponent: () => import('./features/components-docs/empty-state-doc/empty-state-doc').then(c => c.EmptyStateDoc) },
      { path: 'components/multi-select', loadComponent: () => import('./features/components-docs/multi-select-doc/multi-select-doc').then(c => c.MultiSelectDoc) },
      { path: 'components/file-upload', loadComponent: () => import('./features/components-docs/file-upload-doc/file-upload-doc').then(c => c.FileUploadDoc) },
      { path: 'components/stepper', loadComponent: () => import('./features/components-docs/stepper-doc/stepper-doc').then(c => c.StepperDoc) },
      { path: 'components/sidebar', loadComponent: () => import('./features/components-docs/sidebar-doc/sidebar-doc').then(c => c.SidebarDoc) },
      { path: 'components/checkbox', loadComponent: () => import('./features/components-docs/checkbox-doc/checkbox-doc').then(c => c.CheckboxDoc) },
      { path: 'components/radio', loadComponent: () => import('./features/components-docs/radio-doc/radio-doc').then(c => c.RadioDoc) },
      { path: 'components/textarea', loadComponent: () => import('./features/components-docs/textarea-doc/textarea-doc').then(c => c.TextareaDoc) },
      { path: 'components/date-picker', loadComponent: () => import('./features/components-docs/date-picker-doc/date-picker-doc').then(c => c.DatePickerDoc) },
      { path: 'components/alert', loadComponent: () => import('./features/components-docs/alert-doc/alert-doc').then(c => c.AlertDoc) },
      { path: 'components/progress-bar', loadComponent: () => import('./features/components-docs/progress-bar-doc/progress-bar-doc').then(c => c.ProgressBarDoc) },
      { path: 'components/tooltip', loadComponent: () => import('./features/components-docs/tooltip-doc/tooltip-doc').then(c => c.TooltipDoc) },
      { path: 'components/accordion', loadComponent: () => import('./features/components-docs/accordion-doc/accordion-doc').then(c => c.AccordionDoc) },
      { path: 'components/dropdown-menu', loadComponent: () => import('./features/components-docs/dropdown-menu-doc/dropdown-menu-doc').then(c => c.DropdownMenuDoc) },
      { path: 'components/breadcrumb', loadComponent: () => import('./features/components-docs/breadcrumb-doc/breadcrumb-doc').then(c => c.BreadcrumbDoc) },
      { path: 'components/search', loadComponent: () => import('./features/components-docs/search-doc/search-doc').then(c => c.SearchDoc) },
      { path: 'components/form', loadComponent: () => import('./features/components-docs/form-doc/form-doc').then(c => c.FormDoc) },
    ],
  },
];

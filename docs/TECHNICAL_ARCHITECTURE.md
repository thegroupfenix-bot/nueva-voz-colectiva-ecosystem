# Technical Architecture

## Nueva Voz Colectiva Ecosystem V1.0

## 1. Executive Summary

This document defines the technical architecture required to build, deploy, and maintain the public V1.0 institutional portal for Nueva Voz Colectiva Ecosystem on Hostinger.

The portal must be built from scratch using a lean, maintainable, accessible, and secure technical foundation. The initial technology stack is HTML5, CSS3, JavaScript, GitHub, Codex, and Hostinger. WordPress, visual builders, unnecessary dependencies, and inactive future modules must not be used.

The approved Functional Architecture V1.0 remains frozen and must not be changed during technical implementation. This technical architecture defines how to implement that structure without inventing institutional content, publishing empty pages, or activating future modules before they are operationally ready.

The first version must prioritize speed, security, accessibility, SEO, maintainability, clear content governance, and modular growth for the 2026-2036 horizon.

## 2. Mandatory Technical Decisions

The following decisions are mandatory for V1.0:

- Do not use WordPress.
- Do not use visual builders.
- Do not create unnecessary dependencies.
- Do not activate future modules.
- Do not show empty pages.
- Do not publish invented data, figures, allies, projects, results, reports, or impact claims.
- Do not modify the approved functional architecture.
- Do not create final visual design before the design phase.
- Build from scratch with HTML5, CSS3, and JavaScript.
- Use GitHub for version control.
- Use Codex for assisted development and documentation workflows.
- Deploy to Hostinger.
- Keep the first version fast, secure, accessible, and maintainable.

## 3. Recommended Technology

### 3.1 Initial Stack

Recommended V1.0 stack:

- HTML5 for semantic structure.
- CSS3 for layout, responsive behavior, and design system implementation.
- Vanilla JavaScript for navigation, progressive enhancement, form behavior, and small interactions.
- Git for version control.
- GitHub for repository hosting and collaboration.
- Hostinger for production hosting.

### 3.2 Excluded Technologies For V1.0

Avoid in the first version:

- WordPress.
- Wix, Webflow, Elementor, or similar visual builders.
- Heavy JavaScript frameworks.
- Unnecessary CSS frameworks.
- Database-dependent architecture.
- User login systems.
- LMS platforms.
- Headless CMS.
- Complex build pipelines unless later justified.

### 3.3 Future-Compatible Options

The architecture should remain compatible with future integrations:

- Headless CMS.
- Learning management system for Campus Nueva Voz.
- Data dashboards for Observatory.
- Community platform.
- CRM or mailing platform.
- Analytics dashboards.
- Search indexing.
- Multilingual content management.

These future systems must not be activated in V1.0.

## 4. Recommended Repository Structure

The repository should remain simple and understandable.

Recommended technical tree for portal development:

```text
nueva-voz-colectiva-ecosystem/
├── docs/
│   ├── DIGITAL_ECOSYSTEM_MASTER_PLAN.md
│   ├── BRAND_POSITIONING.md
│   ├── GOVERNANCE_MODEL.md
│   ├── SITE_ARCHITECTURE.md
│   ├── INFORMATION_ARCHITECTURE.md
│   ├── SITEMAP.md
│   ├── CONTENT_STRATEGY.md
│   ├── DIGITAL_GOVERNANCE_AND_OPERATING_MODEL.md
│   └── TECHNICAL_ARCHITECTURE.md
├── public/
│   ├── index.html
│   ├── quienes-somos/
│   │   └── index.html
│   ├── programas/
│   │   └── index.html
│   ├── proyectos/
│   │   └── index.html
│   ├── impacto/
│   │   └── index.html
│   ├── biblioteca/
│   │   └── index.html
│   ├── eventos/
│   │   └── index.html
│   ├── participa/
│   │   └── index.html
│   ├── cooperacion-internacional/
│   │   └── index.html
│   ├── transparencia/
│   │   └── index.html
│   ├── sala-de-prensa/
│   │   └── index.html
│   ├── contacto/
│   │   └── index.html
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   ├── img/
│   │   ├── docs/
│   │   └── icons/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── data/
│   ├── components/
│   ├── templates/
│   └── config/
├── scripts/
├── tests/
└── README.md
```

Note: this tree is a recommendation for the future development phase. This document does not create code or folders.

## 5. Folder And File Organization

### 5.1 `docs/`

Purpose:

- Store approved strategic, architectural, governance, and technical documentation.

Rules:

- Do not mix implementation code into `docs/`.
- Do not modify approved strategic documents without explicit approval.
- Keep technical decisions documented before implementation.

### 5.2 `public/`

Purpose:

- Contain production-ready static files for Hostinger deployment.

Rules:

- Every public page should have its own folder and `index.html`.
- Use clean URLs through folder-based paths.
- Do not publish empty folders or placeholder pages.

### 5.3 `public/assets/css/`

Purpose:

- Store global styles, responsive rules, accessibility helpers, and future design system CSS.

Recommended files:

```text
base.css
layout.css
components.css
pages.css
utilities.css
```

### 5.4 `public/assets/js/`

Purpose:

- Store minimal JavaScript for progressive enhancement.

Recommended files:

```text
main.js
navigation.js
forms.js
analytics.js
```

### 5.5 `public/assets/img/`

Purpose:

- Store optimized institutional images.

Rules:

- Do not include invented or generic imagery as institutional evidence.
- Use optimized formats.
- Keep descriptive filenames.
- Maintain alt text inventory.

### 5.6 `public/assets/docs/`

Purpose:

- Store public downloadable PDFs or documents when approved.

Rules:

- Do not publish drafts.
- Do not publish internal documents.
- Use versioned filenames when documents are updated.

### 5.7 `src/`

Purpose:

- Store reusable source structures if the project later uses templates, static generation, or build scripts.

V1.0 may remain fully static. `src/` should only be introduced if it reduces duplication and improves maintainability.

## 6. Page Architecture V1.0

The approved V1.0 public pages are:

```text
/
/quienes-somos/
/programas/
/proyectos/
/impacto/
/biblioteca/
/eventos/
/participa/
/cooperacion-internacional/
/transparencia/
/sala-de-prensa/
/contacto/
```

### 6.1 Active Page Rule

A page should only be published if it contains approved institutional content.

If a section does not have enough verified content, it should:

- Appear as a concise institutional page with approved scope; or
- Be represented as a subsection within another page; or
- Remain unpublished until ready.

### 6.2 No Empty Page Rule

Do not publish pages that say:

- Coming soon.
- Under construction.
- Content pending.
- Placeholder.

Future modules may be mentioned as institutional vision, but not activated as navigable pages until ready.

## 7. Component Strategy

The portal should use reusable components to avoid duplication.

### 7.1 Core Reusable Components

Recommended components:

- Header.
- Main navigation.
- Mega menu.
- Footer.
- Breadcrumbs.
- Page hero.
- Section intro.
- Content card.
- Program card.
- Project card.
- Impact card.
- Resource card.
- Event card.
- Press card.
- Call to action.
- Contact block.
- Form block.
- Alert or notice block.

### 7.2 Institutional Components

Recommended institutional modules:

- Purpose summary.
- Mission and vision block.
- Principles list.
- Governance summary.
- Transparency link block.
- Cooperation summary.
- Impact summary.

### 7.3 Content Components

Recommended content modules:

- Library item.
- Publication item.
- Report item.
- Study item.
- Methodology item.
- Educational resource item.
- Institutional document item.

### 7.4 Implementation Principle

In V1.0, components can be implemented as repeated HTML patterns with shared CSS and JavaScript. A future phase may convert them into templates or CMS-driven components.

## 8. Navigation And Mega Menu

### 8.1 Main Navigation

The main navigation must follow the frozen Functional Architecture V1.0:

```text
Inicio
Quiénes Somos
Programas
Proyectos
Impacto
Biblioteca
Eventos
Participa
Cooperación Internacional
Transparencia
Sala de Prensa
Contacto
```

### 8.2 Mega Menu Strategy

The mega menu should support institutional clarity, not visual complexity.

Recommended mega menu groups:

- Institución: Quiénes Somos, Transparencia, Sala de Prensa, Contacto.
- Acción: Programas, Proyectos, Impacto, Participa.
- Conocimiento: Biblioteca, Eventos.
- Cooperación: Cooperación Internacional, Cooperación y Sostenibilidad.

### 8.3 Mobile Navigation

Mobile navigation must:

- Be keyboard accessible.
- Have clear open and close states.
- Avoid hiding critical routes.
- Preserve the same main hierarchy.
- Avoid excessive nested levels.

### 8.4 Future Modules In Navigation

Do not include inactive modules in the main navigation:

- Campus Nueva Voz.
- Observatorio.
- Comunidad avanzada.
- Certificaciones.
- Centro de Pensamiento.
- Laboratorios Territoriales.
- Plataforma de Convocatorias.
- Plataforma de Voluntariado.

These modules remain hidden until launch.

## 9. Initial Content Management

### 9.1 Initial Content Source

V1.0 content should come only from approved institutional documents and explicitly approved copy.

Do not invent:

- Allies.
- Projects.
- Results.
- Impact figures.
- Donors.
- Reports.
- Territories.
- Program outcomes.
- Media appearances.

### 9.2 Content Storage For V1.0

Recommended initial approach:

- Static HTML pages for core sections.
- Optional structured JSON files for repeatable lists if needed.
- Public documents stored in `public/assets/docs/` only after approval.

### 9.3 Content Governance

Each public content item should have:

- Owner.
- Approval status.
- Last updated date.
- Source document.
- Review requirement.

## 10. Spanish And English Readiness

### 10.1 V1.0 Language

Primary language:

- Spanish.

### 10.2 English Preparation

Prepare for future English content without launching incomplete English pages.

Recommended future structure:

```text
/es/
/en/
```

For V1.0, if only Spanish is ready, use Spanish routes without exposing incomplete English navigation.

### 10.3 Translation Rules

- Do not machine-translate without review.
- Prioritize English for cooperation, impact, governance summaries, and institutional profile.
- Maintain content parity only where operationally sustainable.

## 11. Responsive Strategy

The portal must support:

- Desktop.
- Tablet.
- Mobile.

### 11.1 Desktop

Priorities:

- Clear institutional navigation.
- Readable content width.
- Accessible mega menu.
- Strong page hierarchy.

### 11.2 Tablet

Priorities:

- Simplified layout.
- Flexible card grids.
- Touch-friendly navigation.
- No horizontal overflow.

### 11.3 Mobile

Priorities:

- Fast loading.
- Readable typography.
- Accessible menu.
- Short content blocks.
- Clear contact and participation paths.

### 11.4 Responsive Rules

- Use mobile-first CSS.
- Avoid fixed-width layouts.
- Use fluid containers.
- Use responsive images.
- Test all pages at common breakpoints.

## 12. Accessibility

Accessibility is mandatory for institutional trust and public service.

### 12.1 Standards

Target:

- WCAG 2.2 AA practices where feasible.

### 12.2 Requirements

- Semantic HTML.
- Correct heading hierarchy.
- Keyboard-accessible navigation.
- Visible focus states.
- Sufficient color contrast.
- Text alternatives for images.
- Labels for form fields.
- Error messages for forms.
- Skip-to-content link.
- Avoid motion that cannot be paused.
- Avoid content trapped behind hover-only interactions.

### 12.3 Acceptance Checks

Before launch:

- Keyboard navigation works.
- Forms are labeled.
- Images have alt text.
- Headings are logical.
- Contrast is acceptable.
- Mobile menu is accessible.

## 13. Technical SEO

### 13.1 URL Strategy

Use clean, Spanish, SEO-friendly URLs:

```text
/quienes-somos/
/programas/
/proyectos/
/impacto/
/biblioteca/
/eventos/
/participa/
/cooperacion-internacional/
/transparencia/
/sala-de-prensa/
/contacto/
```

### 13.2 Metadata

Each page should include:

- Unique title.
- Meta description.
- Canonical URL.
- Open Graph title.
- Open Graph description.
- Open Graph image when approved.
- Language attribute.

### 13.3 Structured Data

Future structured data may include:

- Organization.
- WebSite.
- BreadcrumbList.
- Event.
- Article or Report for approved publications.

Only use structured data when the underlying content is real and approved.

### 13.4 Technical Files

Required:

```text
robots.txt
sitemap.xml
```

## 14. Performance

### 14.1 Performance Goals

The first version should be lightweight and fast.

Targets:

- Minimal JavaScript.
- Optimized CSS.
- Compressed images.
- No heavy third-party scripts.
- Good mobile performance.
- Fast first contentful paint.

### 14.2 Performance Rules

- Avoid unused libraries.
- Avoid autoplay media.
- Lazy-load non-critical images.
- Use modern image formats when possible.
- Minimize render-blocking assets.
- Load analytics responsibly.

## 15. Security

### 15.1 Static Site Security

A static portal reduces attack surface, but security still matters.

Requirements:

- Use HTTPS.
- Keep Hostinger account protected with strong credentials.
- Use two-factor authentication where available.
- Restrict deployment access.
- Avoid exposed internal files.
- Do not publish drafts, credentials, or private documents.

### 15.2 Headers

Recommended security headers if Hostinger configuration allows:

- Content-Security-Policy.
- X-Content-Type-Options.
- X-Frame-Options or frame-ancestors.
- Referrer-Policy.
- Permissions-Policy.

### 15.3 Secrets Rule

Do not store secrets in the repository:

- API keys.
- Form service tokens.
- Analytics private keys.
- FTP credentials.
- Hostinger credentials.

## 16. Forms And Validation

### 16.1 Initial Forms

Potential V1.0 forms:

- Contact form.
- Cooperation inquiry form.
- Press contact form.
- Volunteering interest form.
- Newsletter or updates registration.

Activate only forms that have operational capacity to respond.

### 16.2 Validation

Requirements:

- Required field validation.
- Email format validation.
- Consent checkbox where needed.
- Clear success and error messages.
- Accessible labels.
- Privacy notice.

### 16.3 Data Handling

Do not collect unnecessary data.

Every form must define:

- Purpose.
- Recipient.
- Data fields.
- Retention expectation.
- Consent language.
- Response owner.

## 17. Spam Protection

Recommended options:

- Honeypot field.
- Rate limiting through form provider if available.
- CAPTCHA only if needed.
- Server-side validation when backend or form provider exists.
- Block obvious automated submissions.

Avoid intrusive anti-spam that harms accessibility.

## 18. Analytics

### 18.1 Analytics Goals

Measure:

- Page visits.
- Navigation paths.
- Contact conversions.
- Cooperation inquiries.
- Participation interest.
- Library resource usage.
- Event interest.
- Press resource access.

### 18.2 Recommended Setup

Use a privacy-conscious analytics approach where possible.

Options:

- Google Analytics 4.
- Plausible or similar privacy-friendly analytics.
- Hostinger analytics if available.

### 18.3 Analytics Rules

- Do not collect unnecessary personal data.
- Respect privacy policies.
- Configure events intentionally.
- Avoid excessive tracking scripts.

## 19. Images And Document Management

### 19.1 Images

Rules:

- Use approved institutional images only.
- Optimize file size.
- Use descriptive filenames.
- Provide alt text.
- Avoid stock-like imagery that misrepresents the organization.
- Do not invent visual evidence of projects, allies, or results.

### 19.2 Documents

Rules:

- Publish only approved documents.
- Prefer accessible PDFs where PDF is needed.
- Use clear filenames.
- Include document title, date, and version where relevant.
- Keep outdated public documents archived or marked as superseded.

## 20. Future CMS Integration

V1.0 should not require a CMS.

Future CMS integration may be justified when:

- Content volume grows.
- Multiple editors need workflows.
- Library resources become difficult to manage manually.
- English content requires structured translation management.
- Press, events, reports, and resources require frequent updates.

Future CMS requirements:

- Editorial roles.
- Approval workflows.
- Draft and publish states.
- Metadata support.
- Multilingual support.
- Export or backup capability.
- Low vendor lock-in.

## 21. Future Platform Integrations

### 21.1 Campus Nueva Voz

Future integration needs:

- Course catalog.
- Learning paths.
- User accounts.
- Assessment.
- Certification records.
- Privacy controls.

### 21.2 Observatory

Future integration needs:

- Indicator framework.
- Data sources.
- Open data.
- Reports.
- Dashboards.
- Data governance.

### 21.3 Community

Future integration needs:

- Member profiles.
- Volunteers.
- Groups.
- Moderation.
- Consent management.
- Privacy controls.

These systems must remain hidden until operationally ready.

## 22. Variables And Configuration

### 22.1 Configuration Categories

Future configuration may include:

- Site URL.
- Environment name.
- Analytics ID.
- Form endpoint.
- Contact email aliases.
- Language settings.
- Feature flags.

### 22.2 Feature Flags

Use feature flags or equivalent configuration to prevent accidental publication of future modules.

Examples:

```text
ENABLE_CAMPUS=false
ENABLE_OBSERVATORY=false
ENABLE_COMMUNITY=false
ENABLE_CERTIFICATIONS=false
ENABLE_ENGLISH=false
```

For a plain static site, this may be managed manually through build configuration or deployment checklist.

## 23. Environments

### 23.1 Local

Purpose:

- Development and content review.

Requirements:

- Run locally without production credentials.
- Validate pages before upload.
- Test responsive behavior.

### 23.2 Test Or Staging

Purpose:

- Review before production.

Options:

- Hostinger subdomain.
- GitHub Pages preview if appropriate.
- Temporary staging folder.

Rules:

- Do not index staging.
- Do not share staging as public institutional site.

### 23.3 Production

Purpose:

- Official public portal.

Rules:

- Deploy only approved content.
- Use HTTPS.
- Validate forms.
- Confirm analytics.
- Confirm SEO files.

## 24. Git Flow And Hostinger Deployment

### 24.1 Branch Strategy

Recommended branches:

```text
main
codex/documentacion-institucional
codex/portal-v1
codex/content-v1
codex/fix-[topic]
```

`main` should remain stable.

Development branches should be reviewed before merge.

### 24.2 Git Flow

Recommended flow:

```text
Create branch -> Implement -> Review -> Test -> Merge -> Deploy
```

### 24.3 Deployment To Hostinger

Recommended deployment options:

1. GitHub integration if available in the selected Hostinger plan.
2. Manual upload of the `public/` folder through Hostinger File Manager or FTP/SFTP.
3. Automated deployment later through GitHub Actions if compatible and secure.

### 24.4 Deployment Checklist

Before deployment:

- Confirm branch.
- Confirm no draft content.
- Confirm no hidden modules exposed.
- Validate links.
- Validate forms.
- Validate responsive layout.
- Validate accessibility basics.
- Validate SEO metadata.
- Validate `robots.txt`.
- Validate `sitemap.xml`.
- Confirm backup.

## 25. Backups And Recovery

### 25.1 Backup Sources

Required backups:

- GitHub repository.
- Hostinger production files.
- Approved public documents.
- Uploaded media assets.
- Form submissions if used.

### 25.2 Backup Frequency

Recommended:

- Repository: every commit and push.
- Production files: before every deployment.
- Documents and assets: before replacement.
- Forms: according to privacy and retention policy.

### 25.3 Recovery Plan

Minimum recovery process:

```text
Identify incident -> Stop new deployment -> Restore last known good version -> Validate site -> Document incident -> Apply fix -> Redeploy
```

## 26. Acceptance Criteria Before Launch

### 26.1 Content Acceptance

- All public content is approved.
- No invented data is published.
- No empty pages are visible.
- No inactive future modules are visible.
- Functional Architecture V1.0 is respected.

### 26.2 Technical Acceptance

- All pages load correctly.
- Navigation works on desktop, tablet, and mobile.
- Forms work or are intentionally not active.
- Links are valid.
- Images are optimized.
- Documents open correctly.
- `robots.txt` exists.
- `sitemap.xml` exists.

### 26.3 Accessibility Acceptance

- Keyboard navigation works.
- Focus states are visible.
- Form fields have labels.
- Images have alt text.
- Heading order is logical.
- Color contrast is acceptable.

### 26.4 SEO Acceptance

- Each page has a unique title.
- Each page has a meta description.
- Canonical URLs are correct.
- Open Graph metadata is configured.
- Sitemap includes only published pages.

### 26.5 Security Acceptance

- HTTPS is active.
- No credentials are in the repository.
- No internal documents are public.
- Form handling is protected.
- Hostinger access is restricted.

## 27. Technical Risks

### 27.1 Scope Creep

Risk:

- Future modules may be activated before operational readiness.

Mitigation:

- Use feature controls and launch checklist.

### 27.2 Content Integrity Risk

Risk:

- Invented or unapproved content may enter the portal.

Mitigation:

- Require content approval and source tracking.

### 27.3 Maintainability Risk

Risk:

- Static pages may become difficult to maintain as content grows.

Mitigation:

- Use reusable components and plan future CMS integration.

### 27.4 Performance Risk

Risk:

- Heavy scripts or images may slow the site.

Mitigation:

- Use minimal JavaScript and optimized assets.

### 27.5 Accessibility Risk

Risk:

- Navigation, forms, or contrast may fail accessibility expectations.

Mitigation:

- Test accessibility before launch.

### 27.6 Deployment Risk

Risk:

- Manual deployment may upload wrong or incomplete files.

Mitigation:

- Use deployment checklist and backups.

### 27.7 Security Risk

Risk:

- Credentials, forms, or hosting access may be mishandled.

Mitigation:

- Keep secrets out of Git and restrict access.

## 28. Development Plan By Stages

### Stage 1: Technical Preparation

Tasks:

- Confirm repository structure.
- Define development branch.
- Create base folder structure.
- Prepare local development workflow.
- Define deployment approach to Hostinger.

### Stage 2: Static Foundation

Tasks:

- Create semantic HTML structure.
- Create global CSS foundation.
- Create minimal JavaScript foundation.
- Implement header, navigation, mega menu, footer, and core page templates.

### Stage 3: Public V1.0 Pages

Tasks:

- Build approved pages only.
- Add approved content only.
- Avoid empty future pages.
- Implement active modules.

### Stage 4: Forms And Operational Links

Tasks:

- Implement contact forms only when response ownership exists.
- Add spam protection.
- Add validation and privacy notes.

### Stage 5: SEO, Accessibility, Performance

Tasks:

- Add metadata.
- Add sitemap and robots files.
- Test responsive behavior.
- Validate accessibility.
- Optimize assets.

### Stage 6: Staging And Review

Tasks:

- Deploy to staging.
- Review content.
- Test forms.
- Test links.
- Confirm hidden modules are not visible.
- Confirm no invented content.

### Stage 7: Production Deployment

Tasks:

- Backup.
- Deploy to Hostinger.
- Validate production.
- Monitor analytics and errors.
- Document launch.

## 29. Recommendation On When To Start Coding

Code development should start only after the following are confirmed:

1. Functional Architecture V1.0 is accepted as frozen.
2. Technical Architecture is approved.
3. Repository structure is approved.
4. Initial public content inventory is approved.
5. Hostinger deployment method is confirmed.
6. Form handling method is selected.
7. Visual direction or basic design system requirements are approved.

Recommended next step:

- Approve this technical architecture.
- Then create the development branch and scaffold the repository structure.
- Only after that, begin coding the static portal foundation.


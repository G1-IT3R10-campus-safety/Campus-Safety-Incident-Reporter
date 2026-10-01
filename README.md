# Campus Safety & Incident Reporter
**Course / Section:** IT3R10 • Group 1  
**Platform:** React Native / Expo (Android, iOS, Web)  
**Theme:** Slate Steel Blue (`#415A77`) & Soft Slate Blue (`#778DA9`)

---

## 👥 Group 1 Team Members & Architecture Roles

| Member | Feature Branch | Layer & Responsibility | Core Files |
| :--- | :--- | :--- | :--- |
| **Kirklan Caberte** (Lead) | `feature/kirklan-dashboard` | **Presentation Layer (Dashboard & History)**<br>• Project base architecture & skeletons<br>• Dashboard screen with quick metrics & action banner<br>• Reusable `IncidentCard` component (receives props)<br>• Report history screen | `app/screens/HomeScreen.jsx`<br>`app/screens/HistoryScreen.jsx`<br>`app/components/IncidentCard.jsx` |
| **Richmarie Porras** | `feature/richmarie-form` | **Presentation Layer (Incident Report Form)**<br>• Incident report form inputs (Title, Description)<br>• Form state management (`useState`)<br>• Reusable `CategoryPicker` component (receives props) | `app/screens/ReportScreen.jsx`<br>`app/components/CategoryPicker.jsx` |
| **Arwin Ambag** | `feature/arwin-native` | **Native Device & Permissions Layer**<br>• GPS Location status & coordinates<br>• Camera evidence attachment handling<br>• Permission request with graceful fallback UI<br>• Reusable `LocationBadge` component | `app/components/LocationBadge.jsx`<br>`app/services/deviceFeatures.js` |
| **Junrey Roxas** | `feature/junrey-storage` | **Business & Data Storage Layer**<br>• Business validation rules (title, category, desc)<br>• Local data persistence (`AsyncStorage`)<br>• Save, retrieve, and clear report records | `app/utils/validation.js`<br>`app/services/storage.js` |

---

## 📋 Member Implementation & Variable Specification Guide

Para sa matag miyembro, gamita kining opisyal nga mga variable names, props, ug function names aron hapsay ug walay error inig merge:

### 1. Kirklan Caberte (`feature/kirklan-dashboard`)
* **Component:** `app/components/IncidentCard.jsx`
  * **Props nga dawaton:**
    * `title` *(string)* — e.g. `"Broken Street Light"`
    * `category` *(string)* — `"Security"` | `"Hazard"` | `"Medical"` | `"Facility"`
    * `location` *(string)* — e.g. `"Campus Gate 1 Pathway"`
    * `date` *(string)* — e.g. `"Oct 1, 2026 • 8:30 AM"`
    * `status` *(string)* — `"Investigating"` | `"Resolved"` | `"Caution Sign Placed"` | `"Under Review"`
* **Screen:** `app/screens/HomeScreen.jsx`
  * **Props:** `onNavigate` *(function)* — Gamiton aron magbalhin-balhin og screen: `onNavigate('report')` o `onNavigate('history')`.
  * **Display:** Quick Metrics (Total Reports: 12, Active Hazards: 3, Resolved: 9) ug List sa Recent Incidents gamit ang `IncidentCard`.
* **Screen:** `app/screens/HistoryScreen.jsx`
  * **Display:** Listahan sa tanang saved incident reports gamit ang `IncidentCard`.

---

### 2. Richmarie Porras (`feature/richmarie-form`)
* **Component:** `app/components/CategoryPicker.jsx`
  * **Props nga dawaton:**
    * `selectedCategory` *(string)* — Ang kasamtangang napilian nga category (default: `'Security'`).
    * `onSelectCategory` *(function)* — Callback function inig pindot sa category button: `(category) => setCategory(category)`.
  * **Categories:** `['Security', 'Hazard', 'Medical', 'Facility']`
* **Screen:** `app/screens/ReportScreen.jsx`
  * **State Variables (`useState`):**
    * `title` *(string)* — Para sa Incident Title input field.
    * `description` *(string)* — Para sa Description multi-line textarea.
    * `category` *(string)* — Para sa napilian nga category gikan sa `CategoryPicker`.
  * **Function:** `handleSubmit()` — Mo-validate ug magpakita og alert sa gisumiter nga report.

---

### 3. Arwin Ambag (`feature/arwin-native`)
* **Component:** `app/components/LocationBadge.jsx`
  * **Props nga dawaton:**
    * `latitude` *(string / number)* — e.g. `"8.4542"`
    * `longitude` *(string / number)* — e.g. `"124.6319"`
    * `status` *(string)* — `'granted'` o `'denied'`
    * `errorMsg` *(string)* — Mensahe kung gi-deny ang GPS permission.
* **Service:** `app/services/deviceFeatures.js`
  * **Exported Functions:**
    * `requestLocationPermission()` — Mo-request og GPS permission ug mo-return og `{ granted: true, coords: { latitude, longitude } }` o `{ granted: false, status: 'denied', error: '...' }`.
    * `requestCameraPermission()` — Mo-request og Camera permission alang sa evidence capture.

---

### 4. Junrey Roxas (`feature/junrey-storage`)
* **Utility:** `app/utils/validation.js` *(Business Layer)*
  * **Exported Function:** `validateReport(report)`
    * **Input Object:** `{ title, category, description }`
    * **Validation Rules:**
      1. Title dili pwede empty ug kinahanglan at least 3 characters.
      2. Category kinahanglan gipili.
      3. Description dili pwede empty.
    * **Return Object:** `{ isValid: boolean, error: string | null }`
* **Service:** `app/services/storage.js` *(Data Layer)*
  * **Exported Functions:**
    * `saveReport(newReport)` — Magdugang og bag-ong report (with unique `id`, `date`, `status`) ngadto sa local storage.
    * `getReports()` — Mo-return sa array sa tanang reports `[{ id, title, category, location, date, status }]`.
    * `clearReports()` — Mo-clear sa local storage (para sa testing).

---

## 🌿 Git Branching & Workflow Guide para sa Matag Miyembro

Ang `main` ug `development` mao ang base branches. Ang matag miyembro magtrabaho sa ilahang kaugalingong feature branch:

```text
main (Production Release)
  ▲
  │ (Final Sprint Release PR)
development (Integration Base)
  ▲
  ├── feature/kirklan-dashboard   (Kirklan Caberte)
  ├── feature/richmarie-form       (Richmarie Porras)
  ├── feature/arwin-native         (Arwin Ambag)
  └── feature/junrey-storage       (Junrey Roxas)
```

### Git Routine sa Matag Miyembro sa Ilang Laptop:

1. **I-clone ang repository:**
   ```bash
   git clone https://github.com/G1-IT3R10-campus-safety/Campus-Safety-Incident-Reporter.git
   ```

2. **I-switch sa imong feature branch:**
   ```bash
   git checkout <imong-feature-branch>
   ```

3. **I-paste / I-code ang imong assigned files.**

4. **I-save ug I-push:**
   ```bash
   git add .
   git commit -m "Implement assigned feature components and services"
   git push origin <imong-feature-branch>
   ```

5. **Paghimo og Pull Request (PR):**
   * Adto sa GitHub.com $\rightarrow$ I-click ang **"Compare & pull request"**.
   * Siguroha nga ang base branch mao ang **`development`** (`base: development` $\leftarrow$ `compare: feature/...`).
   * I-click ang **"Create pull request"** ug **"Merge"**.

---

## 🚀 How to Run the Application Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

3. **View the application:**
   * Press `w` sa terminal aron modagan sa Web Browser (`http://localhost:8081`).
   * I-scan ang QR code gamit ang **Expo Go** app sa inyong Android o iOS phone.

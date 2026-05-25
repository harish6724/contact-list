# Contacts

A modern, feature-rich contact management application built with vanilla JavaScript, HTML, and CSS. Manage your contacts with a beautiful glassmorphism design, supporting both light and dark themes.

## Features

### Core Functionality
- **Add Contacts** - Create new contacts with name, email, phone, and category
- **Edit Contacts** - Update contact information anytime
- **Delete Contacts** - Remove contacts with confirmation
- **Search** - Real-time search across names, emails, phones, and categories
- **View Details** - See full contact information in an elegant detail pane

### Organization
- **Sorting** - Sort by name, email, or date added
- **Grouping** - Organize by first letter or category
- **Categories** - Assign contacts to custom categories (Work, Friends, Family, etc.)

### Import/Export
- **CSV Import** - Import contacts from CSV files with duplicate detection
- **CSV Export** - Export all contacts to CSV format with all fields

### User Experience
- **Light/Dark Theme** - Toggle between light and dark modes (preference saved)
- **Glassmorphism Design** - Modern, elegant UI with blur effects and transparency
- **Toast Notifications** - Real-time feedback for user actions
- **Responsive Layout** - Sidebar for contact list, detail pane for selected contact
- **Color-Coded Avatars** - Auto-generated avatars with consistent colors per name
- **Smooth Animations** - Staggered animations for list items, smooth transitions

### Data Persistence
- **Local Storage** - All contacts stored in browser's localStorage
- **Auto-Save** - Changes saved automatically
- **Default Data** - 15 sample contacts loaded on first run

## Project Structure

```
contact-list/
├── index.html          # Main HTML structure
├── app.js              # Core application logic (vanilla JS)
├── style.css           # Styling with design tokens and components
└── README.md          # This file
```

## Getting Started

### Opening the Application

Simply open `index.html` in a modern web browser. No build process or dependencies required.

```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx http-server

# Then visit: http://localhost:8000
```

## Usage

### Adding a Contact
1. Click the **Add Contact** button in the header
2. Fill in the contact details (name is required)
3. Click **Save contact**

### Searching
- Use the search bar in the sidebar to filter contacts
- Search works across name, email, phone, and category fields
- Results update in real-time

### Sorting and Grouping
- Use the **Sort** dropdown to order contacts by Name, Email, or Date Added
- Use the **Group** dropdown to organize by Letter (A-Z) or Category
- Combine sort and group options for flexible organization

### Editing a Contact
1. Select a contact from the list
2. Click **Edit contact** in the detail pane
3. Update the information
4. Click **Save contact**

### Deleting a Contact
1. Select a contact from the list
2. Click **Delete** in the detail pane
3. Confirm the deletion when prompted

### Importing Contacts
1. Click the **Import** button in the header
2. Select a CSV file
3. Contacts are imported with duplicate email detection
4. A notification shows how many were imported and skipped

### Exporting Contacts
1. Click the **Export** button in the header
2. A CSV file with all contacts is downloaded as `contacts.csv`

### Switching Themes
- Click the sun/moon icon in the header to toggle between light and dark modes
- Your theme preference is saved

### Quick Actions
- **Copy Contact Info** - Click the copy icon next to email or phone in the detail pane
- **Contact Links** - Click email addresses to open mail client, phone numbers to dial

## CSV Format

For importing contacts, use the following CSV format:

```csv
name,email,phone,category
Alice Smith,alice@example.com,+1-555-0101,Work
Bob Jones,bob@example.com,+1-555-0102,Friends
Carol Brown,,+1-555-0103,Family
```

Required field: **name**  
Optional fields: **email**, **phone**, **category**

The CSV export includes all fields plus **createdAt** (timestamp).

## Data Storage

All contact data is stored in the browser's `localStorage` under the key `contacts_v1`. 

- Contacts are automatically saved after any change
- Data persists between sessions
- Clearing browser data will delete all contacts
- No data is sent to any server

## Technical Details

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS with Custom Properties (CSS Variables)
- **Storage**: Browser localStorage
- **No Dependencies**: Pure HTML, CSS, and JavaScript

### Key Features
- **Responsive Design** - Works on desktop and tablet (min-width: 800px recommended)
- **Accessible** - Proper ARIA labels and semantic HTML
- **Performance** - Efficient DOM updates and event delegation
- **Cross-browser** - Supports all modern browsers (Chrome, Firefox, Safari, Edge)

### Design System
The application uses a comprehensive design token system:
- **Colors**: Blue-based primary colors with semantic shades
- **Spacing**: Consistent spacing scale (rem-based)
- **Typography**: System font stack for performance
- **Shadows**: Layered shadow system for depth
- **Animations**: Spring easing and smooth transitions
- **Glassmorphism**: Blur and transparency effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Modern mobile browsers

Requires:
- `localStorage` API
- `Blob` and `URL.createObjectURL()`
- ES6+ JavaScript support
- CSS Backdrop Filter support (for glassmorphism effects)

## Sample Data

The application comes with 15 sample contacts across different categories (Work, Friends, Family) with realistic international names and contact information. These are loaded on first run and can be fully customized.

## Performance Notes

- Efficient list rendering with animation staggering
- Single event listeners with delegation
- Minimal DOM manipulation
- CSS-based animations for performance
- Lazy avatar color generation

## Tips for Best Experience

1. **Search First** - Use search to quickly find contacts instead of scrolling
2. **Use Categories** - Assign categories to group contacts meaningfully
3. **Export Regularly** - Keep backups by exporting your contacts
4. **Sort by Usage** - Sort by date added to find recently added contacts
5. **Theme Preference** - Set your preferred theme; it's remembered

## Troubleshooting

**Contacts disappeared after clearing browser data?**
- Clearing browser cache/cookies also clears localStorage. Keep backups by exporting to CSV.

**Import not working?**
- Ensure your CSV has a header row and includes at least a "name" column
- Check for email duplicates (duplicates won't be imported)
- Ensure file is actually CSV format, not Excel

**Can't copy contact info?**
- Check browser's clipboard permissions in privacy settings

## Future Enhancement Ideas

- Cloud sync / multi-device support
- Contact photos / profile images
- Relationship mapping (families, teams)
- Birthday/anniversary reminders
- Email integration
- Contact deduplication tools
- Advanced filtering and saved views
- Keyboard shortcuts and dark mode improvements

## License

This project is open source and available for personal and commercial use.

## Author

Created with attention to detail and user experience in mind.

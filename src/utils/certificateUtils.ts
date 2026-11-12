import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DateFormatOption, PageOrientation, PaperSize, SavedDraft } from '../types/certificate';

const STORAGE_KEY = 'cert_generator_saved_drafts_v1';
const SESSION_COUNTER_KEY = 'cert_generator_session_count';

/**
 * Format individual name components into a single clean string.
 */
export function formatName(first: string, middle: string, last: string): string {
  const parts = [first, middle, last]
    .map((p) => p?.trim())
    .filter(Boolean);
  return parts.join(' ');
}

/**
 * Capitalize first letters of names cleanly.
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Calculate age from birth date.
 */
export function calculateAge(birthDateStr: string, referenceDateStr?: string): string | null {
  if (!birthDateStr) return null;
  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return null;

  const refDate = referenceDateStr ? new Date(referenceDateStr) : new Date();
  if (isNaN(refDate.getTime()) || refDate < birthDate) return null;

  let years = refDate.getFullYear() - birthDate.getFullYear();
  let months = refDate.getMonth() - birthDate.getMonth();
  const days = refDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) return null;

  if (years === 0) {
    if (months === 0) {
      return 'Newborn';
    }
    return `${months} month${months > 1 ? 's' : ''} old`;
  }

  return `${years} year${years > 1 ? 's' : ''} old`;
}

/**
 * Format ISO dates (YYYY-MM-DD) into user-specified date format.
 */
export function formatDisplayDate(dateStr?: string, format: DateFormatOption = 'Month DD, YYYY'): string {
  if (!dateStr) return '—';
  
  // Handle ISO string or simple YYYY-MM-DD
  const parts = dateStr.split('-');
  if (parts.length !== 3) {
    return dateStr;
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const d = new Date(year, month, day);
  if (isNaN(d.getTime())) return dateStr;

  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const yyyy = String(year);

  const monthsLong = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  switch (format) {
    case 'MM/DD/YYYY':
      return `${mm}/${dd}/${yyyy}`;
    case 'DD/MM/YYYY':
      return `${dd}/${mm}/${yyyy}`;
    case 'Month DD, YYYY':
    default:
      return `${monthsLong[month]} ${day}, ${yyyy}`;
  }
}

/**
 * LocalStorage draft management
 */
export function getSavedDrafts(): SavedDraft[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load drafts from localStorage:', err);
    return [];
  }
}

export function saveDraft(draft: SavedDraft): SavedDraft[] {
  try {
    const drafts = getSavedDrafts();
    const existingIndex = drafts.findIndex((d) => d.id === draft.id);
    if (existingIndex >= 0) {
      drafts[existingIndex] = { ...draft, updatedAt: Date.now() };
    } else {
      drafts.unshift({ ...draft, createdAt: Date.now(), updatedAt: Date.now() });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return drafts;
  } catch (err) {
    console.error('Failed to save draft to localStorage:', err);
    return getSavedDrafts();
  }
}

export function deleteDraft(id: string): SavedDraft[] {
  try {
    const drafts = getSavedDrafts().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return drafts;
  } catch (err) {
    console.error('Failed to delete draft:', err);
    return getSavedDrafts();
  }
}

export function duplicateDraft(id: string): SavedDraft | null {
  try {
    const drafts = getSavedDrafts();
    const target = drafts.find((d) => d.id === id);
    if (!target) return null;

    const copy: SavedDraft = {
      ...target,
      id: 'draft_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: `${target.title} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    drafts.unshift(copy);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    return copy;
  } catch (err) {
    console.error('Failed to duplicate draft:', err);
    return null;
  }
}

export function clearAllDrafts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear drafts:', err);
  }
}

/**
 * Session generation counter
 */
export function getSessionCount(): number {
  try {
    const count = sessionStorage.getItem(SESSION_COUNTER_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementSessionCount(): number {
  try {
    const count = getSessionCount() + 1;
    sessionStorage.setItem(SESSION_COUNTER_KEY, String(count));
    return count;
  } catch {
    return 1;
  }
}

/**
 * Trigger browser print
 */
export function printCertificate(): void {
  incrementSessionCount();
  window.print();
}

/**
 * High-quality PDF export matching exact preview dimensions and layout
 */
export async function downloadCertificatePDF(
  elementId: string,
  filename: string,
  paperSize: PaperSize = 'a4',
  orientation: PageOrientation = 'portrait'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Certificate element not found for export');
    return false;
  }

  try {
    incrementSessionCount();

    // Render element with high resolution html2canvas
    const canvas = await html2canvas(element, {
      scale: 2.5, // Crisp retina resolution
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');

    // Setup jsPDF paper sizes in mm
    // A4: 210 x 297 mm
    // Letter: 215.9 x 279.4 mm
    const isLetter = paperSize === 'letter';
    const isLandscape = orientation === 'landscape';

    const pdf = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: isLetter ? 'letter' : 'a4',
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Fit image cleanly within the page with 4mm safe margin or border
    const margin = 0; // The preview already has internal padding/margin
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Centered placement if aspect ratio leaves extra vertical space
    const xPos = margin;
    const yPos = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : margin;

    pdf.addImage(imgData, 'PNG', xPos, yPos, imgWidth, Math.min(imgHeight, pageHeight));
    pdf.save(`${filename.replace(/[^a-z0-9_-]/gi, '_')}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

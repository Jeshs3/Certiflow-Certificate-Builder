import React from 'react';
import {
  BackgroundColor,
  BorderStyle,
  CertificateStyle,
  CertificateType,
  DateFormatOption,
  FontSize,
  FontStyle,
  PageMargins,
  PageOrientation,
  PaperSize,
  TextAlign,
} from '../types/certificate';
import { BIRTH_TEMPLATES, MARRIAGE_TEMPLATES } from '../utils/sampleData';
import {
  Palette,
  Type,
  Maximize,
  Sliders,
  Sparkles,
  Layout,
  AlignLeft,
  AlignCenter,
  ShieldAlert,
} from 'lucide-react';

interface CustomizationPanelProps {
  type: CertificateType;
  style: CertificateStyle;
  onChange: (updates: Partial<CertificateStyle>) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  type,
  style,
  onChange,
}) => {
  const templates = type === 'birth' ? BIRTH_TEMPLATES : MARRIAGE_TEMPLATES;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Sliders className="w-4 h-4 text-sky-600" />
        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
          Template & Design Customization
        </h3>
      </div>

      {/* 1. Template Presets */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Select Template Layout
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {templates.map((tpl) => {
            const isSelected = style.templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  let border: BorderStyle = 'double-gold';
                  let font: FontStyle = 'serif';
                  let bg: BackgroundColor = 'warm-ivory';

                  if (tpl.id === 'ph-colb-102') {
                    border = 'classic-navy';
                    font = 'classic';
                    bg = 'pure-white';
                  } else if (tpl.id === 'modern-professional') {
                    border = 'classic-navy';
                    font = 'modern';
                    bg = 'cool-slate';
                  } else if (tpl.id === 'simple-admin') {
                    border = 'minimal-subtle';
                    font = 'classic';
                    bg = 'pure-white';
                  } else if (tpl.id === 'elegant-decorative' || tpl.id === 'elegant-formal') {
                    border = 'double-gold';
                    font = 'formal';
                    bg = 'warm-ivory';
                  } else if (tpl.id === 'simple-decorative') {
                    border = 'ornate-slate';
                    font = 'serif';
                    bg = 'soft-parchment';
                  }

                  onChange({
                    templateId: tpl.id,
                    borderStyle: border,
                    fontStyle: font,
                    backgroundColor: bg,
                  });
                }}
                className={`p-3 text-left rounded-lg border transition-all ${
                  isSelected
                    ? 'border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-sky-900' : 'text-slate-800'}`}>
                    {tpl.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      isSelected
                        ? 'bg-sky-200/80 text-sky-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {tpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Certificate Title & Subtitle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Certificate Title
          </label>
          <input
            type="text"
            value={style.certificateTitle}
            onChange={(e) => onChange({ certificateTitle: e.target.value })}
            className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
            placeholder="e.g. CERTIFICATE OF BIRTH"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Subtitle / Specimen Tag
          </label>
          <input
            type="text"
            value={style.subTitle || ''}
            onChange={(e) => onChange({ subTitle: e.target.value })}
            className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
            placeholder="e.g. SPECIMEN RECORD OF CIVIL REGISTRATION"
          />
        </div>
      </div>

      {/* 3. Paper Size & Page Orientation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Layout className="w-3.5 h-3.5 text-slate-500" />
            Orientation
          </label>
          <select
            value={style.pageOrientation}
            onChange={(e) => onChange({ pageOrientation: e.target.value as PageOrientation })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-slate-500" />
            Paper Size
          </label>
          <select
            value={style.paperSize}
            onChange={(e) => onChange({ paperSize: e.target.value as PaperSize })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="a4">A4 (210 × 297 mm)</option>
            <option value="letter">Letter (8.5 × 11 in)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Page Margins
          </label>
          <select
            value={style.pageMargins}
            onChange={(e) => onChange({ pageMargins: e.target.value as PageMargins })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="compact">Compact</option>
            <option value="normal">Normal</option>
            <option value="generous">Generous</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Date Format
          </label>
          <select
            value={style.dateFormat}
            onChange={(e) => onChange({ dateFormat: e.target.value as DateFormatOption })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="Month DD, YYYY">Month DD, YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          </select>
        </div>
      </div>

      {/* 4. Typography & Alignments */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            Font Family
          </label>
          <select
            value={style.fontStyle}
            onChange={(e) => onChange({ fontStyle: e.target.value as FontStyle })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="serif">Cinzel / Traditional Serif</option>
            <option value="formal">Playfair Display / Formal</option>
            <option value="modern">Montserrat / Clean Sans</option>
            <option value="classic">Merriweather / Classic</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Text Size
          </label>
          <select
            value={style.fontSize}
            onChange={(e) => onChange({ fontSize: e.target.value as FontSize })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="small">Small (Dense)</option>
            <option value="medium">Medium (Standard)</option>
            <option value="large">Large (Prominent)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Text Alignment
          </label>
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => onChange({ textAlign: 'left' })}
              className={`flex items-center justify-center gap-1 py-1 text-xs rounded font-medium ${
                style.textAlign === 'left' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-600'
              }`}
            >
              <AlignLeft className="w-3 h-3" />
              Left
            </button>
            <button
              type="button"
              onClick={() => onChange({ textAlign: 'center' })}
              className={`flex items-center justify-center gap-1 py-1 text-xs rounded font-medium ${
                style.textAlign === 'center' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-600'
              }`}
            >
              <AlignCenter className="w-3 h-3" />
              Center
            </button>
          </div>
        </div>
      </div>

      {/* 5. Border & Background Tint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-slate-500" />
            Border Styling
          </label>
          <select
            value={style.borderStyle}
            onChange={(e) => onChange({ borderStyle: e.target.value as BorderStyle })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="double-gold">Double Gold Filigree Frame</option>
            <option value="classic-navy">Navy Blue Administrative Border</option>
            <option value="ornate-slate">Slate Embossed Border</option>
            <option value="minimal-subtle">Clean Minimal Border</option>
            <option value="vintage-frame">Vintage Archival Border</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-slate-500" />
            Background Paper Tone
          </label>
          <select
            value={style.backgroundColor}
            onChange={(e) => onChange({ backgroundColor: e.target.value as BackgroundColor })}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="warm-ivory">Warm Ivory (#FAF7F0)</option>
            <option value="soft-parchment">Soft Parchment (#F5EFEB)</option>
            <option value="subtle-cream">Subtle Cream (#FFFDF7)</option>
            <option value="pure-white">Pure Crisp White</option>
            <option value="cool-slate">Cool Administrative Slate (#F8FAFC)</option>
          </select>
        </div>
      </div>

      {/* 6. Decorative and Watermark Settings */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <div>
              <span className="text-xs font-medium text-slate-800 block">
                Corner Embellishments & Flourishes
              </span>
              <span className="text-[11px] text-slate-500">
                Display decorative vintage border corner motifs
              </span>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={style.showDecorativeElements}
              onChange={(e) => onChange({ showDecorativeElements: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
        </div>

        <div className="pt-2 border-t border-slate-200/60">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              Sample Watermark Opacity
            </span>
            <span className="text-xs font-mono text-slate-500">
              {Math.round((style.watermarkOpacity ?? 0.12) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.08"
            max="0.30"
            step="0.02"
            value={style.watermarkOpacity ?? 0.12}
            onChange={(e) => onChange({ watermarkOpacity: parseFloat(e.target.value) })}
            className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />
          <p className="text-[10px] text-slate-500 mt-1 italic">
            * Per safety requirements, a SAMPLE watermark is permanently applied to all generated mockups.
          </p>
        </div>
      </div>
    </div>
  );
};

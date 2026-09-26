import React, { useState } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  RotateCcw,
  Check,
  X,
  FileText,
} from 'lucide-react';
import { BusinessWorkspace } from '../../types';
import { downloadCSV, generateSampleUploadCSV } from '../../services/exportService';
import { trackEvent } from '../../services/analyticsService';

interface DataImportViewProps {
  workspace: BusinessWorkspace;
  onNavigateToOverview: () => void;
}

type ImportStep = 'upload' | 'preview' | 'mapping' | 'confirmation';

export const DataImportView: React.FC<DataImportViewProps> = ({ workspace, onNavigateToOverview }) => {
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [fileName, setFileName] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<{ [key: string]: string }>({
    date: 'Date',
    locationCode: 'Location_Code',
    sku: 'Product_SKU',
    name: 'Product_Name',
    volume: 'Units_Sold',
    price: 'Unit_Price',
    cost: 'Unit_Cost',
    opex: 'Direct_OpEx',
  });

  const handleDownloadSample = () => {
    const sample = generateSampleUploadCSV();
    downloadCSV('profittrace_sample_import.csv', sample);
    trackEvent({ category: 'feature', action: 'download_sample_csv' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    trackEvent({ category: 'feature', action: 'csv_upload_attempt', label: file.name });

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter((l) => l.trim().length > 0);
    if (lines.length < 2) {
      setValidationErrors(['File appears empty or missing header row.']);
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const rows: any[] = [];
    const errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
      if (cols.length !== headers.length) {
        errors.push(`Row ${i + 1}: Column count mismatch (found ${cols.length}, expected ${headers.length}).`);
        continue;
      }

      const rowObj: any = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cols[idx];
      });
      rows.push(rowObj);
    }

    // Validation rules
    if (rows.length === 0) {
      errors.push('No valid transaction records found.');
    }

    setParsedRows(rows);
    setValidationErrors(errors);
    setCurrentStep('preview');
  };

  const handleProceedToMapping = () => {
    setCurrentStep('mapping');
  };

  const handleExecuteImport = () => {
    // Simulated ingestion into workspace
    trackEvent({
      category: 'feature',
      action: 'csv_import_completed',
      metadata: { rowCount: parsedRows.length },
    });
    setCurrentStep('confirmation');
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setFileName('');
    setParsedRows([]);
    setValidationErrors([]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E9E3] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1F2421]">Data Ingestion & CSV Import</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F7FAF5] border border-[#CBD6CB] text-[#587C55] rounded">
              POS & ERP Bridge
            </span>
          </div>
          <p className="text-xs text-[#68716B] mt-0.5">
            Import dispenser telemetry, retail transactions, and supplier invoices to reconcile actual margins.
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#1F2421] border border-[#CBD6CB] hover:bg-[#F7FAF5] rounded-md transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Sample CSV Template</span>
        </button>
      </div>

      {/* Import Step Indicator */}
      <div className="flex items-center justify-between border border-[#E3E9E3] bg-white rounded-md p-3 text-xs">
        <div className={`flex items-center gap-2 font-semibold ${currentStep === 'upload' ? 'text-[#587C55]' : 'text-[#1F2421]'}`}>
          <span className="w-5 h-5 rounded bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center text-[10px]">1</span>
          <span>Upload File</span>
        </div>
        <div className="text-[#CBD6CB]">→</div>

        <div className={`flex items-center gap-2 font-semibold ${currentStep === 'preview' ? 'text-[#587C55]' : 'text-[#68716B]'}`}>
          <span className="w-5 h-5 rounded bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center text-[10px]">2</span>
          <span>Validate & Preview</span>
        </div>
        <div className="text-[#CBD6CB]">→</div>

        <div className={`flex items-center gap-2 font-semibold ${currentStep === 'mapping' ? 'text-[#587C55]' : 'text-[#68716B]'}`}>
          <span className="w-5 h-5 rounded bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center text-[10px]">3</span>
          <span>Map Schema Columns</span>
        </div>
        <div className="text-[#CBD6CB]">→</div>

        <div className={`flex items-center gap-2 font-semibold ${currentStep === 'confirmation' ? 'text-[#587C55]' : 'text-[#68716B]'}`}>
          <span className="w-5 h-5 rounded bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center text-[10px]">4</span>
          <span>Reconciliation Status</span>
        </div>
      </div>

      {/* Step 1: Upload */}
      {currentStep === 'upload' && (
        <div className="bg-white p-8 border border-dashed border-[#CBD6CB] rounded-md text-center space-y-4">
          <div className="w-12 h-12 rounded-md bg-[#F7FAF5] border border-[#CBD6CB] flex items-center justify-center mx-auto text-[#587C55]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2421]">Select Transaction File to Ingest</h2>
            <p className="text-xs text-[#68716B] mt-1 max-w-md mx-auto">
              Drop your POS export, fuel meter slip log, or inventory CSV here. Standard UTF-8 encoded files supported.
            </p>
          </div>

          <div className="pt-2">
            <label className="inline-flex px-5 py-2.5 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md cursor-pointer transition-colors">
              <span>Choose CSV File</span>
              <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="pt-4 border-t border-[#E3E9E3] max-w-sm mx-auto text-[11px] text-[#68716B] space-y-1">
            <p><strong>Supported columns:</strong> Date, Location_Code, Product_SKU, Product_Name, Units_Sold, Unit_Price, Unit_Cost, Direct_OpEx</p>
          </div>
        </div>
      )}

      {/* Step 2: Preview & Validation */}
      {currentStep === 'preview' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E9E3]">
            <div>
              <h2 className="text-sm font-bold text-[#1F2421]">File Parsing & Validation: {fileName}</h2>
              <p className="text-xs text-[#68716B]">{parsedRows.length} valid rows recognized from upload</p>
            </div>
            <button onClick={handleReset} className="text-xs text-[#68716B] hover:text-[#1F2421]">
              Upload different file
            </button>
          </div>

          {/* Errors alert if any */}
          {validationErrors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Validation warnings detected:</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Data Preview Table */}
          <div className="border border-[#E3E9E3] rounded overflow-hidden max-h-60 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF5] border-b border-[#E3E9E3] text-[#68716B] sticky top-0">
                <tr>
                  {parsedRows[0] &&
                    Object.keys(parsedRows[0]).map((h, i) => (
                      <th key={i} className="p-2.5 font-mono">{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E9E3]">
                {parsedRows.slice(0, 5).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#F7FAF5]/50">
                    {Object.values(row).map((val: any, cIdx) => (
                      <td key={cIdx} className="p-2.5 font-mono text-[#1F2421] truncate max-w-[140px]">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-[#68716B] hover:text-[#1F2421]"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedToMapping}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>Verify Schema Mapping</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A8CFA3]" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Column Mapping */}
      {currentStep === 'mapping' && (
        <div className="bg-white p-6 border border-[#E3E9E3] rounded-md space-y-5">
          <div>
            <h2 className="text-sm font-bold text-[#1F2421]">Confirm Schema Field Mapping</h2>
            <p className="text-xs text-[#68716B]">Align your CSV column headers with the ProfitTrace analytical database model</p>
          </div>

          <div className="space-y-3 text-xs">
            {Object.entries(columnMapping).map(([key, mappedCol]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-[#F7FAF5] border border-[#E3E9E3] rounded">
                <div>
                  <span className="font-bold text-[#1F2421] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-[10px] text-[#68716B] block">Required for margin waterfall calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#68716B]">Mapped to:</span>
                  <select
                    value={mappedCol}
                    onChange={(e) => setColumnMapping({ ...columnMapping, [key]: e.target.value })}
                    className="border border-[#CBD6CB] bg-white rounded px-3 py-1 font-mono font-medium text-xs focus:border-[#587C55]"
                  >
                    {parsedRows[0] &&
                      Object.keys(parsedRows[0]).map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E3E9E3]">
            <button
              onClick={() => setCurrentStep('preview')}
              className="px-4 py-2 text-xs font-semibold text-[#68716B] hover:text-[#1F2421]"
            >
              Back to Preview
            </button>
            <button
              onClick={handleExecuteImport}
              className="px-5 py-2 text-xs font-semibold text-white bg-[#587C55] hover:bg-[#486646] rounded-md transition-colors flex items-center gap-1.5"
            >
              <span>Execute Ingestion & Reconcile</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {currentStep === 'confirmation' && (
        <div className="bg-white p-8 border border-[#A8CFA3] rounded-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F7FAF5] border border-[#A8CFA3] flex items-center justify-center mx-auto text-[#587C55]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1F2421]">Transactions Successfully Reconciled</h2>
            <p className="text-xs text-[#68716B] mt-1 max-w-md mx-auto">
              {parsedRows.length} records processed into {workspace.name}. Waterfall steps and margin indicators have been refreshed across all dashboards.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3 text-xs">
            <button
              onClick={handleReset}
              className="px-4 py-2 font-medium text-[#1F2421] border border-[#CBD6CB] rounded hover:bg-[#F7FAF5]"
            >
              Import Another Batch
            </button>
            <button
              onClick={onNavigateToOverview}
              className="px-4 py-2 font-semibold text-white bg-[#1F2421] hover:bg-[#2e3631] rounded-md transition-colors"
            >
              Go to Overview Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

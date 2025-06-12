<script lang="ts">
    import { calorieDateMap } from '../../stores.ts';
  
    let importError: string | null = null;
    let currentTab = "export";
  
    function exportJSON() {
      const dataStr = JSON.stringify($calorieDateMap, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      triggerDownload(dataBlob, `calorie-data-${getDateString()}.json`);
    }
  
    function exportCSV() {
      const headers = ["date", "calories"];
      const csvRows = [headers.join(","), ...Object.entries($calorieDateMap).map(([date, calories]) => `${date},${calories ?? ''}`)];
      const csvString = csvRows.join("\n");
      const dataBlob = new Blob([csvString], { type: "text/csv" });
      triggerDownload(dataBlob, `calorie-data-${getDateString()}.csv`);
    }
  
    function triggerDownload(blob: Blob, filename: string) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  
    function getDateString() {
      return new Date().toISOString().split("T")[0];
    }
  
    function importJSON(event: Event) {
      importError = null;
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const content = reader.result as string;
          const data = JSON.parse(content);
          // If already in the correct format, just use it
          if (
            typeof data === "object" &&
            data !== null &&
            !Array.isArray(data)
          ) {
            onImport(data);
            return;
          }
          // If array of {date, calories}, convert to object
          if (
            Array.isArray(data) &&
            data.every((item) => typeof item === "object" && "date" in item && "calories" in item)
          ) {
            const obj: Record<string, number | null> = {};
            for (const item of data) {
              obj[item.date] = item.calories;
            }
            onImport(obj);
            return;
          }
          throw new Error("Invalid data format.");
        } catch (err) {
          importError = `Failed to import JSON: ${err instanceof Error ? err.message : "Unknown error"}`;
        }
      };
      // Reset input value so the same file can be selected again
      input.value = "";
      reader.readAsText(file);
    }
  
    function importCSV(event: Event) {
      importError = null;
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const content = reader.result as string;
          const rows = content.split("\n").filter(Boolean);
          const headers = rows[0].split(",");
          const dateIndex = headers.indexOf("date");
          const caloriesIndex = headers.indexOf("calories");

          if (dateIndex === -1 || caloriesIndex === -1) {
            throw new Error("CSV must include 'date' and 'calories' columns");
          }

          const obj: Record<string, number | null> = {};
          rows.slice(1).forEach((row) => {
            const values = row.split(",");
            const date = values[dateIndex];
            const caloriesStr = values[caloriesIndex];
            let calories: number | null = null;
            if (caloriesStr !== undefined && caloriesStr !== "") {
              const parsed = parseInt(caloriesStr, 10);
              calories = isNaN(parsed) ? null : parsed;
            }
            obj[date] = calories;
          });
          onImport(obj);
        } catch (err) {
          importError = `Failed to import CSV: ${err instanceof Error ? err.message : "Unknown error"}`;
        }
      };
      // Reset input value so the same file can be selected again
      input.value = "";
      reader.readAsText(file);
    }

    let onImport = (data: Record<string, number | null>) => {
      // Ensure the data is in the correct format
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        importError = "Invalid data format. Expected an object.";
        return;
      }
      importError = null;
      for (const key in data) {
        // Check if key is a valid date string
        const dateObj = new Date(key);
        if (isNaN(dateObj.getTime())) {
          importError = `Invalid date key: "${key}".`;
          return;
        }
        // Check if value is null or a number
        if (data[key] !== null && typeof data[key] !== "number") {
          importError = `Invalid calorie value for date ${key}. Expected a number or null.`;
          return;
        }
        data[key] = data[key] === null ? null : Number(data[key]);
      }
      calorieDateMap.update((map) => ({ ...data }));
    };
  </script>
  
  <div class="card">
    <div class="card-header">
      <h2>Data Export & Import</h2>
      <p>Export your calorie data or import from a file</p>
    </div>
    <div class="tabs">
      <div class="tabs-list">
        <button class:selected={currentTab === "export"} on:click={() => (currentTab = "export")}>Export Data</button>
        <button class:selected={currentTab === "import"} on:click={() => (currentTab = "import")}>Import Data</button>
      </div>
  
      {#if currentTab === "export"}
        <div class="export-buttons">
          <button on:click={exportJSON}>
            Export as JSON
          </button>
          <button on:click={exportCSV}>
            Export as CSV
          </button>
        </div>
      {/if}
  
      {#if currentTab === "import"}
        <div class="import-upload">
          <label for="json-upload" class="upload-box">
            <p>Import JSON</p>
            <input id="json-upload" type="file" accept=".json" on:change={importJSON} hidden />
          </label>
          <label for="csv-upload" class="upload-box">
            <p>Import CSV</p>
            <input id="csv-upload" type="file" accept=".csv" on:change={importCSV} hidden />
          </label>
        </div>
  
        {#if importError}
          <div class="error-box">{importError}</div>
        {/if}
      {/if}
    </div>
  </div>
  
  <style>
    .card {
      background-color: #000;
      border: 1px solid #333;
      color: white;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 0.5rem;
      max-width: 100%;
    }
  
    .card-header {
      text-align: center;
      margin-bottom: 1rem;
    }
  
    .card-header p {
      color: #aaa;
    }
  
    .tabs-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #111;
      margin-bottom: 1rem;
    }
  
    .tabs-list button {
      padding: 0.5rem 1rem;
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }
  
    .tabs-list button.selected {
      border-bottom: 2px solid white;
      background-color: #222;
    }
  
    .export-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  
    .export-buttons button {
      background: #111;
      color: white;
      border: 1px solid #444;
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
    }
  
    .export-buttons button:hover {
      background: #222;
    }
  
    .import-upload {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  
    .upload-box {
      background: #111;
      border: 2px dashed #555;
      border-radius: 0.5rem;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      color: #ccc;
      transition: background 0.3s;
    }
  
    .upload-box:hover {
      background: #222;
    }
  
    .error-box {
      margin-top: 1rem;
      background: #400;
      color: #fbb;
      padding: 0.75rem;
      border: 1px solid #800;
      border-radius: 0.5rem;
    }
  </style>
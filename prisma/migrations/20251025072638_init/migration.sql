-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "strNumber" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "profilePhoto" TEXT,
    "logoUrl" TEXT,
    "signatureUrl" TEXT,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,
    "bankAccountHolder" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "schedule" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "animal_species" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "company_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "companyName" TEXT,
    "companyTypeId" TEXT,
    "picName" TEXT,
    "picPhone" TEXT,
    "taxId" TEXT,
    "idCardNumber" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastContactedAt" DATETIME,
    CONSTRAINT "clients_companyTypeId_fkey" FOREIGN KEY ("companyTypeId") REFERENCES "company_types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "speciesId" TEXT NOT NULL,
    "breed" TEXT,
    "gender" TEXT NOT NULL,
    "furColor" TEXT,
    "microchipNumber" TEXT,
    "insuranceInfo" TEXT,
    "dateOfBirth" DATETIME,
    "weight" REAL,
    "photoUrl" TEXT,
    "photoDriveId" TEXT,
    "locationId" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "lastVisited" DATETIME,
    "allergies" TEXT,
    "specialNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "patients_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "animal_species" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "patients_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "patient_ownerships" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "ownershipType" TEXT NOT NULL,
    "isPrimaryOwner" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "relationship" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "patient_ownerships_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "patient_ownerships_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medical_records" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "locationId" TEXT NOT NULL,
    "broughtByClientId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "weight" REAL,
    "temperature" REAL,
    "heartRate" INTEGER,
    "respiratoryRate" INTEGER,
    "bloodPressure" TEXT,
    "examinationType" TEXT NOT NULL,
    "complaint" TEXT,
    "diagnosis" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "prescription" TEXT,
    "followUpNotes" TEXT,
    "nextFollowUpDate" DATETIME,
    "invoiceId" TEXT,
    "photoUrls" TEXT,
    "photoDriveIds" TEXT,
    "voiceNotesUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "medical_records_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_records_broughtByClientId_fkey" FOREIGN KEY ("broughtByClientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_records_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "address" TEXT,
    "notes" TEXT,
    "reminderSentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "appointments_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "appointments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "clientId" TEXT NOT NULL,
    "patientId" TEXT,
    "medicalRecordId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'unpaid',
    "dueDate" DATETIME NOT NULL,
    "paymentDate" DATETIME,
    "paymentMethod" TEXT,
    "subtotal" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "tax" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    "pdfUrl" TEXT,
    "pdfDriveId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "invoices_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" REAL NOT NULL,
    "subtotal" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "service_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "defaultPrice" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "medical_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "defaultDiagnosis" TEXT,
    "defaultTreatment" TEXT,
    "checklistItems" TEXT,
    "notesTemplate" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vaccinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "vaccineType" TEXT NOT NULL,
    "vaccinationDate" DATETIME NOT NULL,
    "nextVaccinationDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'due',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "vaccinations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "currentStock" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" REAL NOT NULL,
    "minStock" INTEGER NOT NULL,
    "expiredDate" DATETIME,
    "supplier" TEXT,
    "locationIds" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastRestockedAt" DATETIME
);

-- CreateTable
CREATE TABLE "inventory_usage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inventoryId" TEXT NOT NULL,
    "medicalRecordId" TEXT,
    "patientId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "quantityUsed" INTEGER NOT NULL,
    "unitCostAtTime" REAL NOT NULL,
    "usedByLocation" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_usage_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inventory_usage_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "medical_records" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_usage_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inventory_restocks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "inventoryId" TEXT NOT NULL,
    "quantityAdded" INTEGER NOT NULL,
    "costPerUnit" REAL NOT NULL,
    "totalCost" REAL NOT NULL,
    "supplier" TEXT,
    "purchaseDate" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_restocks_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoicePrefix" TEXT NOT NULL DEFAULT 'INV/',
    "invoiceCounter" INTEGER NOT NULL DEFAULT 1,
    "paymentMethods" TEXT,
    "invoiceTerms" TEXT,
    "invoiceDueDays" INTEGER NOT NULL DEFAULT 7,
    "reminderEnabled" BOOLEAN NOT NULL DEFAULT true,
    "reminderDaysBefore" INTEGER NOT NULL DEFAULT 1,
    "reminderTemplate" TEXT,
    "dateFormat" TEXT NOT NULL DEFAULT 'DD/MM/YYYY',
    "currencyFormat" TEXT NOT NULL DEFAULT 'Rp',
    "timezone" TEXT NOT NULL DEFAULT 'WIB',
    "itemsPerPage" INTEGER NOT NULL DEFAULT 25,
    "autoBackupEnabled" BOOLEAN NOT NULL DEFAULT false,
    "backupFrequency" TEXT NOT NULL DEFAULT 'weekly',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "description" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT
);

-- CreateTable
CREATE TABLE "backups" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "backupDate" DATETIME NOT NULL,
    "size" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "googleDriveId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "animal_species_name_key" ON "animal_species"("name");

-- CreateIndex
CREATE UNIQUE INDEX "company_types_name_key" ON "company_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "patient_ownerships_patientId_clientId_key" ON "patient_ownerships"("patientId", "clientId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoiceNumber_key" ON "invoices"("invoiceNumber");

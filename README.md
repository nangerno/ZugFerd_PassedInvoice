# Google App Script for ZugFeRD v2.2 Invoice Validation

This script is to help pass the **ZugFeRD v2.2** standard for electronic invoices. **ZugFeRD** (Zentraler User Guide für den elektronischen Rechnungsdatenaustausch)

## Validator

The provided **ZugFeRD v2.2** invoices can be validated using the official validation tool:

- **Validation Tool**: [ZugFeRD Validator](https://validator.invoice-portal.de/index.php)
  - This online tool allows you to validate your ZugFeRD invoices to ensure compliance with the standard.

## Steps for Validation

1. **Prepare the Invoice**:
   - Ensure your invoice is in **ZugFeRD v2.2** format.
   - The invoice file should be a **PDF** containing embedded XML data for the structured invoice.

2. **Upload the Invoice**:
   - Visit the [ZugFeRD Validator](https://validator.invoice-portal.de/index.php) page.
   - Click on the **Choose File** button and select your **ZugFeRD v2.2** invoice.

3. **Validate the Invoice**:
   - Generate XML file from Google Sheet by using Google App Script
   - Run Validation

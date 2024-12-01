function generateInvoiceXML() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var invoiceNumber = sheet.getRange('A4').getValue();
    var issueDate = sheet.getRange('B4').getValue();
    var supplierName = sheet.getRange('C4').getValue();
    var customerStreet = sheet.getRange('D4').getValue();
    var customerCity = sheet.getRange('E4').getValue();
    var customerPostalCode = sheet.getRange('F4').getValue();
    var customerEmail = sheet.getRange('G4').getValue();
    var lineDescription = sheet.getRange('H4').getValue();
    var quantity = sheet.getRange('I4').getValue();
    var unitPrice = sheet.getRange('J4').getValue();
    var lineAmount = sheet.getRange('K4').getValue();
    var totalAmount = sheet.getRange('T4').getValue();
    var vatRate = sheet.getRange('U4').getValue();
    var taxSubtotal = sheet.getRange('V4').getValue();
    var grandTotal = sheet.getRange('W4').getValue();
    var dueDate = sheet.getRange('Y4').getValue();
    var serviceDescription = sheet.getRange('AA4').getValue();
    var invoiceType = sheet.getRange('AB4').getValue();
  
    var sellerName = "Holger Grosser";
    var sellerPostalCode = "90763";
    var sellerStreet = "Simonstr. 14";
    var sellerCity = "Fürth";
    var sellerCountry = "DE";
    var sellerVATId = "DE225320101";
  
    var customerCountry = "DE";
  
    var xmlContent = `<?xml version='1.0' encoding='UTF-8'?>
  <rsm:CrossIndustryInvoice xmlns:a="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:10" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
    <rsm:ExchangedDocumentContext>
      <ram:GuidelineSpecifiedDocumentContextParameter>
        <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic</ram:ID>
      </ram:GuidelineSpecifiedDocumentContextParameter>
    </rsm:ExchangedDocumentContext>
    <rsm:ExchangedDocument>
      <ram:ID>${invoiceNumber}</ram:ID>
      <ram:TypeCode>380</ram:TypeCode>
      <ram:IssueDateTime>
        <udt:DateTimeString format="102">${formatDate(issueDate)}</udt:DateTimeString>
      </ram:IssueDateTime>
      <ram:IncludedNote>
        <ram:Content>${supplierName}</ram:Content>
      </ram:IncludedNote>
      <ram:IncludedNote>
        <ram:Content>Unsere GLN: 4000001123452</ram:Content>
      </ram:IncludedNote>
      <ram:IncludedNote>
        <ram:Content>Ihre GLN: 4000001987658</ram:Content>
      </ram:IncludedNote>
      <ram:IncludedNote>
        <ram:Content>Ihre Kundennummer: GE2020211</ram:Content>
      </ram:IncludedNote>
    </rsm:ExchangedDocument>
    <rsm:SupplyChainTradeTransaction>
      <ram:IncludedSupplyChainTradeLineItem>
        <ram:AssociatedDocumentLineDocument>
          <ram:LineID>1</ram:LineID>
        </ram:AssociatedDocumentLineDocument>
        <ram:SpecifiedTradeProduct>
          <ram:Name>${lineDescription}</ram:Name>
        </ram:SpecifiedTradeProduct>
        <ram:SpecifiedLineTradeAgreement>
          <ram:NetPriceProductTradePrice>
            <ram:ChargeAmount>${unitPrice}</ram:ChargeAmount>
          </ram:NetPriceProductTradePrice>
        </ram:SpecifiedLineTradeAgreement>
        <ram:SpecifiedLineTradeDelivery>
          <ram:BilledQuantity unitCode="H87">${quantity}</ram:BilledQuantity>
        </ram:SpecifiedLineTradeDelivery>
        <ram:SpecifiedLineTradeSettlement>
          <ram:ApplicableTradeTax>
            <ram:TypeCode>VAT</ram:TypeCode>
            <ram:CategoryCode>S</ram:CategoryCode>
            <ram:RateApplicablePercent>${vatRate}</ram:RateApplicablePercent>
          </ram:ApplicableTradeTax>
          <ram:SpecifiedTradeSettlementLineMonetarySummation>
            <ram:LineTotalAmount>${lineAmount}</ram:LineTotalAmount>
          </ram:SpecifiedTradeSettlementLineMonetarySummation>
        </ram:SpecifiedLineTradeSettlement>
      </ram:IncludedSupplyChainTradeLineItem>
      <ram:ApplicableHeaderTradeAgreement>
        <ram:SellerTradeParty>
          <ram:Name>${sellerName}</ram:Name>
          <ram:PostalTradeAddress>
            <ram:PostcodeCode>${sellerPostalCode}</ram:PostcodeCode>
            <ram:LineOne>${sellerStreet}</ram:LineOne>
            <ram:CityName>${sellerCity}</ram:CityName>
            <ram:CountryID>${sellerCountry}</ram:CountryID>
          </ram:PostalTradeAddress>
          <ram:SpecifiedTaxRegistration>
            <ram:ID schemeID="VA">${sellerVATId}</ram:ID>
          </ram:SpecifiedTaxRegistration>
        </ram:SellerTradeParty>
        <ram:BuyerTradeParty>
          <ram:Name>${customerEmail}</ram:Name>
          <ram:PostalTradeAddress>
            <ram:PostcodeCode>${customerPostalCode}</ram:PostcodeCode>
            <ram:LineOne>${customerStreet}</ram:LineOne>
            <ram:CityName>${customerCity}</ram:CityName>
            <ram:CountryID>${customerCountry}</ram:CountryID>
          </ram:PostalTradeAddress>
        </ram:BuyerTradeParty>
      </ram:ApplicableHeaderTradeAgreement>
      <ram:ApplicableHeaderTradeDelivery>
        <ram:ActualDeliverySupplyChainEvent>
          <ram:OccurrenceDateTime>
            <udt:DateTimeString format="102">${formatDate(issueDate)}</udt:DateTimeString>
          </ram:OccurrenceDateTime>
        </ram:ActualDeliverySupplyChainEvent>
      </ram:ApplicableHeaderTradeDelivery>
      <ram:ApplicableHeaderTradeSettlement>
        <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
        <ram:ApplicableTradeTax>
          <ram:CalculatedAmount>${taxSubtotal}</ram:CalculatedAmount>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:BasisAmount>${lineAmount}</ram:BasisAmount>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>${vatRate}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradePaymentTerms>
          <ram:DueDateDateTime>
            <udt:DateTimeString format="102">${formatDate(dueDate)}</udt:DateTimeString>
          </ram:DueDateDateTime>
        </ram:SpecifiedTradePaymentTerms>
        <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
          <ram:LineTotalAmount>${lineAmount}</ram:LineTotalAmount>
          <ram:ChargeTotalAmount>0</ram:ChargeTotalAmount>
          <ram:AllowanceTotalAmount>0</ram:AllowanceTotalAmount>
          <ram:TaxBasisTotalAmount>${lineAmount}</ram:TaxBasisTotalAmount>
          <ram:TaxTotalAmount currencyID="EUR">${taxSubtotal}</ram:TaxTotalAmount>
          <ram:GrandTotalAmount>${grandTotal}</ram:GrandTotalAmount>
          <ram:DuePayableAmount>${grandTotal}</ram:DuePayableAmount>
        </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
      </ram:ApplicableHeaderTradeSettlement>
    </rsm:SupplyChainTradeTransaction>
  </rsm:CrossIndustryInvoice>`;
  
    var fileName = "Invoice_" + invoiceNumber + ".xml";
    var file = DriveApp.createFile(fileName, xmlContent, "application/xml");
    Logger.log(file.getUrl());
  }
  
  function formatDate(date) {
    var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyyMMdd");
    return formattedDate;
  }
  
declare global {
  namespace Equipments {
    interface CreatePayload {
      modelId: number | null,
      personalId: number | null,
      cabinetId: number | null,
      serialNumber: string | null,
      inventoryNumber: string | null,
    }

    interface Equipment {
      model: number,
      person: number,
      cabinet: number,
      serialNumber: string | null,
      inventoryNumber: string | null,
    }
  }
  namespace Personal {
    interface CreatePayload {
      firstName: string
      lastName: string
      surName: string | null
    }

    interface Person {
      id: number
      firstName: string
      lastName: string
      surName: string | null
    }
  }
  namespace Cabinets {
    interface Cabinet { }
  }
}

export { }
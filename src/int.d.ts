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
      id: number
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
      position: string | null
      fullName: string
      shortName: string
    }
  }
  namespace Cabinets {
    interface Cabinet {
      id: number,
      number: number,
      responsible?: Personal.Person
    }
  }
  namespace Messages {
    interface Message {
      message: string,
      type: "error" | "warn" | "info"
      timestamp: number
      hold: boolean
      uid: string
    }
  }

  namespace iModels {
    interface Model {
      id: number,
      name: string,
      brand?: number
    }
  }
  namespace Brands {
    interface Brand {
      id: number,
      name: string,
    }
  }
  namespace iTypes {
    interface iType {
      id: number,
      name: string
    }
  }
}

export { }
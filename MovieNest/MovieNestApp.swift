//
//  MovieNestApp.swift
//  MovieNest
//
//  Created by Samanyu on 24/02/25.
//

import SwiftUI

@main
struct MovieNestApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}

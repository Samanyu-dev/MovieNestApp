//
//  ContentView.swift
//  MovieNest
//
//  Created by Samanyu on 24/02/25.
//

import SwiftUI
import CoreData

struct ContentView: View {
    @State var currentTab: Tab = .home
    
    init() {
        UITabBar.appearance().isHidden = true
    }
    
    var body: some View {
        VStack(spacing: 0.0){
            TabView(selection: $currentTab) {
                HomeView()
                    .tag(Tab.home)
                
                TicketView()
                    .tag(Tab.movies)
                
                Text("Watchlist")
                    .tag(Tab.more)
                
                Text("Profile")
                    .tag(Tab.profile)
                
                Text("Categories")
                    .tag(Tab.tv)
            }
            CustomTabBar(currentTab: $currentTab)
        }
    }
}

struct ContentView_Previews:
    PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
